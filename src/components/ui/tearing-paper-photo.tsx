"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
    ACESFilmicToneMapping,
    AmbientLight,
    Color,
    Group,
    LoadingManager,
    Mesh,
    PerspectiveCamera,
    PlaneGeometry,
    PointLight,
    Scene,
    ShaderMaterial,
    Texture,
    TextureLoader,
    CanvasTexture,
    Vector2,
    WebGLRenderer,
    LinearFilter,
} from "three";

import { cn } from "@/lib/cn";

export interface TearingPaperPhotoImage {
    src?: string;
    canvas?: HTMLCanvasElement;
    image?: HTMLImageElement;
}

export interface TearingPaperPhotoProps {
    images?: TearingPaperPhotoImage[];
    ripTextureSrc?: string;
    sheetWidth?: number;
    sheetHeight?: number;
    borderSize?: number;
    className?: string;
    showHandHint?: boolean;
    handHintDelay?: number;
    autoTear?: boolean;
    autoTearInterval?: number;
}

const DEFAULT_SHEET_WIDTH = 1.275;
const DEFAULT_SHEET_HEIGHT = 1.753125;
const DEFAULT_BORDER_SIZE = 0.051;

const DEFAULT_IMAGES: TearingPaperPhotoImage[] = [
    { src: "/assets/tear-card-1.jpg" },
    { src: "/assets/tear-card-2.jpg" },
    { src: "/assets/tear-card-3.jpg" },
];

const RIP_VERTEX_SHADER = /* glsl */ `
uniform float uTearAmount;
uniform float uTearWidth;
uniform float uTearXAngle;
uniform float uTearYAngle;
uniform float uTearZAngle;
uniform float uTearXOffset;
uniform float uXDirection;
uniform float uRipSide;
uniform float uRipSeed;

varying vec2 vUv;
varying float vAmount;

mat4 rotationX(in float angle) {
    return mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, cos(angle), -sin(angle), 0.0,
        0.0, sin(angle), cos(angle), 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotationY(in float angle) {
    return mat4(
        cos(angle), 0.0, sin(angle), 0.0,
        0.0, 1.0, 0.0, 0.0,
        -sin(angle), 0.0, cos(angle), 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotationZ(in float angle) {
    return mat4(
        cos(angle), -sin(angle), 0.0, 0.0,
        sin(angle), cos(angle), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

void main() {
    float ripAmount = 0.0;
    float yAmount = max(0.0, (uTearAmount - (1.0 - uv.y)));
    float zRotate = uTearZAngle * yAmount;
    float xRotate = uTearXAngle * yAmount;
    float yRotate = uTearYAngle * yAmount;
    vec3 rotation = vec3(xRotate * yAmount, yRotate * yAmount, zRotate * yAmount);

    float halfHeight = float(HEIGHT) * 0.5;
    float halfWidth = (float(WIDTH) - uTearWidth * 0.5) * 0.5;

    vec4 vertex = vec4(
        position.x + (halfWidth * uXDirection) - halfWidth,
        position.y + halfHeight,
        position.z,
        1.0
    );

    vertex = vertex * rotationY(rotation.y) * rotationX(rotation.x) * rotationZ(rotation.z);
    vertex.x += uTearXOffset * yAmount + ripAmount + halfWidth;
    vertex.y -= halfHeight;

    vec4 modelPosition = modelMatrix * vertex;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vAmount = yAmount;
}
`;

const RIP_FRAGMENT_SHADER = /* glsl */ `
uniform sampler2D uMap;
uniform sampler2D uRip;

uniform vec3 uShadeColor;
uniform float uUvOffset;
uniform float uRipSide;
uniform float uTearXAngle;
uniform float uShadeAmount;
uniform float uTearWidth;
uniform float uWhiteThreshold;
uniform float uTearOffset;
uniform vec2 uImageSize;
uniform float uBorderSize;

varying vec2 vUv;
varying float vAmount;

vec2 containUv(vec2 uv, float containerAspect, float imageAspect) {
    if (imageAspect > containerAspect) {
        // Image is wider than container: letterbox vertically
        float scale = imageAspect / containerAspect;
        return vec2(uv.x, uv.y * scale - (scale - 1.0) * 0.5);
    }
    // Image is taller than container: letterbox horizontally
    float scale = containerAspect / imageAspect;
    return vec2(uv.x * scale - (scale - 1.0) * 0.5, uv.y);
}

void main() {
    bool rightSide = uRipSide == 1.0;
    float ripAmount = -1.0;
    float width = float(WIDTH);
    float widthOverlap = (uTearWidth * 0.5) + width;

    float xScale = widthOverlap / float(FULL_WIDTH);
    vec2 uvOffset = vec2(vUv.x * xScale + uUvOffset, vUv.y);
    float containerAspect = float(FULL_WIDTH) / float(HEIGHT);
    float imageAspect = uImageSize.x / max(uImageSize.y, 0.0001);
    vec2 mapUv = containUv(uvOffset, containerAspect, imageAspect);

    // If UV falls outside [0, 1] bounds due to contain fitting, make it completely transparent!
    vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);
    float cardAlpha = 1.0;
    if (mapUv.x >= 0.0 && mapUv.x <= 1.0 && mapUv.y >= 0.0 && mapUv.y <= 1.0) {
        textureColor = texture2D(uMap, mapUv);
        cardAlpha = textureColor.a;
    } else {
        cardAlpha = 0.0;
    }

    float borderX = 0.0;
    float borderY = 0.0;
    bool isBorder = uvOffset.x < borderX
        || uvOffset.x > 1.0 - borderX
        || uvOffset.y < borderY
        || uvOffset.y > 1.0 - borderY;
    if (isBorder) textureColor = vec4(vec3(0.95), 1.0);

    float ripRange = uTearWidth / widthOverlap;
    float ripStart = rightSide ? 0.0 : 1.0 - ripRange;

    float ripAlpha = 1.0;

    // Check if current UV is within the tearing seam / overlap zone
    bool inRipZone = vUv.x >= ripStart && vUv.x <= (ripStart + ripRange);

    if (inRipZone) {
        float ripX = clamp((vUv.x - ripStart) / ripRange, 0.0, 1.0);
        float ripY = vUv.y * 0.5 + (0.5 * uTearOffset);
        vec4 ripCut = texture2D(uRip, vec2(ripX, ripY));
        vec4 ripColor = texture2D(uRip, vec2(ripX * 0.9, ripY - 0.02));

        float whiteness = dot(vec3(1.0), ripCut.rgb) / 3.0;

        if (!rightSide) {
            // Left piece keeps the WHITE portion (left side of tear)
            if (whiteness <= uWhiteThreshold) {
                float edgeWhiteness = dot(vec3(1.0), ripColor.rgb) / 3.0;
                if (edgeWhiteness >= uWhiteThreshold) {
                    textureColor = vec4(0.96, 0.96, 0.96, 1.0); // deckle paper edge
                } else {
                    ripAlpha = 0.0;
                }
            }
        } else {
            // Right piece keeps the BLACK portion (right side of tear)
            if (whiteness >= uWhiteThreshold) {
                float edgeWhiteness = dot(vec3(1.0), ripColor.rgb) / 3.0;
                if (edgeWhiteness < uWhiteThreshold) {
                    textureColor = vec4(0.96, 0.96, 0.96, 1.0); // deckle paper edge
                } else {
                    ripAlpha = 0.0;
                }
            }
        }
    } else {
        // Outside the tear seam:
        // Left piece exists for vUv.x < ripStart (where rip texture would be white)
        if (!rightSide && vUv.x > ripStart + ripRange) {
            ripAlpha = 0.0;
        }
        // Right piece exists for vUv.x > ripStart + ripRange (where rip texture would be black)
        if (rightSide && vUv.x < ripStart) {
            ripAlpha = 0.0;
        }
    }

    float finalAlpha = cardAlpha * ripAlpha;
    vec3 shadedColor = mix(textureColor.rgb, uShadeColor, vAmount * uShadeAmount);
    gl_FragColor = vec4(shadedColor, finalAlpha);
}
`;

type SheetSideId = "left" | "right";

interface SheetSideSettings {
    uvOffset: number;
    ripSide: number;
    tearXAngle: number;
    tearYAngle: number;
    tearZAngle: number;
    tearXOffset: number;
    direction: number;
    shadeColor: Color;
    shadeAmount: number;
}

interface SheetSettings {
    widthSegments: number;
    heightSegments: number;
    tearOffset: number;
    width: number;
    height: number;
    tearAmount: number;
    tearWidth: number;
    ripWhiteThreshold: number;
    left: SheetSideSettings;
    right: SheetSideSettings;
}

interface PhotoTextures {
    photo: Texture;
    rip: Texture;
    imageSize: Vector2;
}

interface ImageEntry {
    texture: Texture;
    imageSize: Vector2;
}

function getImageDimensions(src: string, texture?: Texture) {
    const image = texture?.image as HTMLImageElement | undefined;

    if (image?.width && image?.height) {
        return new Vector2(image.width, image.height);
    }

    try {
        const url = new URL(src);
        const width = Number(url.searchParams.get("width"));
        const height = Number(url.searchParams.get("height"));

        if (width > 0 && height > 0) {
            return new Vector2(width, height);
        }
    } catch {
        // Fall through to the plane aspect ratio.
    }

    return new Vector2(DEFAULT_SHEET_WIDTH, DEFAULT_SHEET_HEIGHT);
}

function getThreeColorFromCss(color: string) {
    const normalized = color.trim();
    const isSupportedCssColor =
        normalized.startsWith("#") ||
        normalized.startsWith("rgb") ||
        normalized.startsWith("hsl");

    if (isSupportedCssColor) {
        return new Color(normalized);
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
        return new Color("#000000");
    }

    context.fillStyle = normalized;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;

    return new Color(red / 255, green / 255, blue / 255);
}

class LoaderOverlay {
    mesh: Mesh;

    constructor(color = "black") {
        this.mesh = new Mesh(
            new PlaneGeometry(2, 2, 1, 1),
            new ShaderMaterial({
                uniforms: {
                    uColor: { value: getThreeColorFromCss(color) },
                    uAlpha: { value: 1 },
                },
                vertexShader: /* glsl */ `
                    void main() {
                        gl_Position = vec4(position.xy, 0.5, 1.0);
                    }
                `,
                fragmentShader: /* glsl */ `
                    uniform vec3 uColor;
                    uniform float uAlpha;
                    void main() {
                        gl_FragColor = vec4(uColor, uAlpha);
                    }
                `,
                transparent: true,
                depthTest: false,
            }),
        );
    }

    get progress() {
        return 0;
    }

    set progress(_value: number) {
        // Reserved for parity with the original loader API.
    }

    get alpha() {
        return (this.mesh.material as ShaderMaterial).uniforms.uAlpha.value as number;
    }

    set alpha(value: number) {
        (this.mesh.material as ShaderMaterial).uniforms.uAlpha.value = value;
    }
}

class Stage {
    canvas: HTMLCanvasElement;
    scene: Scene;
    sizes = { width: 0, height: 0 };
    camera: PerspectiveCamera;
    cameraGroup: Group;
    renderer: WebGLRenderer;
    private currentPhotoHeight = DEFAULT_SHEET_HEIGHT;

    constructor(domCanvasElement: HTMLCanvasElement) {
        this.canvas = domCanvasElement;
        this.scene = new Scene();

        this.camera = new PerspectiveCamera(
            30,
            this.sizes.width / this.sizes.height,
            0.1,
            100,
        );
        this.camera.position.set(0, 0, 6);
        this.scene.add(this.camera);

        this.cameraGroup = new Group();
        this.scene.add(this.cameraGroup);

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: window.devicePixelRatio === 1,
            alpha: true,
        });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;

        this.onResize = this.onResize.bind(this);
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    fitPhoto(sheetHeight: number) {
        this.currentPhotoHeight = sheetHeight;
        const aspect = Math.max(0.1, this.sizes.width / Math.max(1, this.sizes.height));
        // Vertical FOV = 30 deg -> half angle tan is ~0.2679
        const vFovHalfTan = Math.tan((30 * Math.PI) / 360);
        // Scaled up to 1.02x framing so the card fills the view prominently without clipping edges
        const distForHeight = (sheetHeight * 0.5 * 1.02) / vFovHalfTan;
        const sheetWidth = sheetHeight * 0.75;
        const distForWidth = (sheetWidth * 0.5 * 1.02) / (vFovHalfTan * aspect);
        
        this.camera.position.z = Math.max(distForHeight, distForWidth);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
    }

    onResize() {
        const parent = this.canvas.parentElement;
        const width = parent?.clientWidth || this.canvas.clientWidth || window.innerWidth;
        const height = parent?.clientHeight || this.canvas.clientHeight || 500;

        this.sizes.width = Math.max(100, width);
        this.sizes.height = Math.max(100, height);

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sizes.width, this.sizes.height, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
        this.fitPhoto(this.currentPhotoHeight);
    }

    add(item: Mesh | Group | AmbientLight | PointLight) {
        this.scene.add(item);
    }

    render() {
        this.cameraGroup.position.copy(this.camera.position);
        this.cameraGroup.rotation.copy(this.camera.rotation);
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        window.removeEventListener("resize", this.onResize);
        this.renderer.dispose();
    }
}

interface PhotoSheetSize {
    width: number;
    height: number;
    borderSize: number;
}

class Photo {
    destroyCallback: () => void;
    photoTexture: Texture;
    ripTexture: Texture;
    imageSize: Vector2;
    borderSize: number;
    interactive = false;
    group = new Group();
    sheetSettings: SheetSettings;
    sides: Array<{
        id: SheetSideId;
        mesh: Mesh;
        material: ShaderMaterial;
    }>;
    sheetPlane: PlaneGeometry;

    constructor(
        textures: PhotoTextures,
        destroyCallback: () => void,
        sheetSize: PhotoSheetSize,
    ) {
        this.destroyCallback = destroyCallback;
        this.photoTexture = textures.photo;
        this.ripTexture = textures.rip;
        this.imageSize = textures.imageSize;
        this.borderSize = sheetSize.borderSize;

        this.group.rotation.z = (Math.random() * 0.1 - 0.05);
        this.group.position.y = 1.5;

        this.interactive = true;

        gsap
            .timeline({
                defaults: {
                    duration: 0.6,
                    ease: "power3.out",
                },
            })
            .to(this.group.rotation, { z: 0 }, 0)
            .to(this.group.position, { y: 0 }, 0);

        const width = sheetSize.width;
        const height = sheetSize.height;
        const tearWidth = 0.4 * (width / 3);

        this.sheetSettings = {
            widthSegments: 30,
            heightSegments: 50,
            tearOffset: Math.random(),
            width,
            height,
            tearAmount: 0,
            tearWidth,
            ripWhiteThreshold: 0.7,
            left: {
                uvOffset: 0,
                ripSide: 0,
                tearXAngle: -0.01,
                tearYAngle: -0.1,
                tearZAngle: 0.05,
                tearXOffset: 0,
                direction: -1,
                shadeColor: new Color("white"),
                shadeAmount: 0.2,
            },
            right: {
                uvOffset: ((width - tearWidth) / width) * 0.5,
                ripSide: 1,
                tearXAngle: 0.2,
                tearYAngle: 0.1,
                tearZAngle: -0.1,
                tearXOffset: 0,
                direction: 1,
                shadeColor: new Color("black"),
                shadeAmount: 0.4,
            },
        };

        this.sheetPlane = new PlaneGeometry(
            this.sheetSettings.width / 2 + this.sheetSettings.tearWidth / 2,
            this.sheetSettings.height,
            this.sheetSettings.widthSegments,
            this.sheetSettings.heightSegments,
        );

        this.sides = (["left", "right"] as const).map((id) => {
            const material = this.getRipMaterial(id);
            const mesh = new Mesh(this.sheetPlane, material);

            if (this.sheetSettings[id].tearXAngle > 0) {
                mesh.position.z += 0.0001;
            }

            this.group.add(mesh);
            return { id, mesh, material };
        });
    }

    getRipMaterial(side: SheetSideId) {
        const settings = this.sheetSettings[side];

        return new ShaderMaterial({
            defines: {
                HEIGHT: this.sheetSettings.height,
                WIDTH: this.sheetSettings.width / 2,
                FULL_WIDTH: this.sheetSettings.width,
                HEIGHT_SEGMENTS: this.sheetSettings.heightSegments,
                WIDTH_SEGMENTS: this.sheetSettings.widthSegments,
            },
            uniforms: {
                uMap: { value: this.photoTexture },
                uRip: { value: this.ripTexture },
                uRipSide: { value: settings.ripSide },
                uTearWidth: { value: this.sheetSettings.tearWidth },
                uWhiteThreshold: { value: this.sheetSettings.ripWhiteThreshold },
                uTearAmount: { value: this.sheetSettings.tearAmount },
                uTearOffset: { value: this.sheetSettings.tearOffset },
                uUvOffset: { value: settings.uvOffset },
                uTearXAngle: { value: settings.tearXAngle },
                uTearYAngle: { value: settings.tearYAngle },
                uTearZAngle: { value: settings.tearZAngle },
                uTearXOffset: { value: settings.tearXOffset },
                uXDirection: { value: settings.direction },
                uShadeColor: { value: settings.shadeColor },
                uShadeAmount: { value: settings.shadeAmount },
                uImageSize: { value: this.imageSize.clone() },
                uBorderSize: { value: this.borderSize },
            },
            transparent: true,
            vertexShader: RIP_VERTEX_SHADER,
            fragmentShader: RIP_FRAGMENT_SHADER,
        });
    }

    shouldCompleteRip() {
        return this.sheetSettings.tearAmount >= 1.5;
    }

    updateUniforms() {
        if (this.interactive && this.shouldCompleteRip()) {
            this.remove();
            return;
        }

        if (this.sheetSettings.tearAmount === 0) {
            this.sheetSettings.tearOffset = Math.random();
        }

        this.sides.forEach((side) => {
            const uniforms = side.material.uniforms;
            const settings = this.sheetSettings[side.id];

            uniforms.uTearAmount.value = this.sheetSettings.tearAmount;
            uniforms.uTearOffset.value = this.sheetSettings.tearOffset;
            uniforms.uUvOffset.value = settings.uvOffset;
            uniforms.uTearXAngle.value = settings.tearXAngle;
            uniforms.uTearYAngle.value = settings.tearYAngle;
            uniforms.uTearZAngle.value = settings.tearZAngle;
            uniforms.uTearXOffset.value = settings.tearXOffset;
            uniforms.uXDirection.value = settings.direction;
            uniforms.uShadeColor.value = settings.shadeColor;
            uniforms.uShadeAmount.value = settings.shadeAmount;
            uniforms.uWhiteThreshold.value =
                this.sheetSettings.ripWhiteThreshold;
            uniforms.uImageSize.value.copy(this.imageSize);
            uniforms.uBorderSize.value = this.borderSize;
        });
    }

    completeRip() {
        if (this.sheetSettings.tearAmount >= 1.15) {
            this.remove();
        } else {
            this.reset();
        }
    }

    reset() {
        gsap.to(this.sheetSettings, {
            tearAmount: 0,
            onUpdate: () => this.updateUniforms(),
        });
    }

    remove() {
        this.interactive = false;
        this.destroyCallback();

        const removeAnimation = gsap.timeline({
            defaults: { duration: 1, ease: "power2.in" },
            onComplete: () => this.destroyMe(),
        });

        removeAnimation.to(this.sheetSettings, {
            tearAmount: 1.5 + Math.random() * 1.5,
            ease: "power2.out",
            onUpdate: () => this.updateUniforms(),
        });
        removeAnimation.to(this.group.position, { z: 1 }, 0);

        this.sides.forEach((side) => {
            const ripSide = this.sheetSettings[side.id].ripSide;

            removeAnimation.to(
                side.mesh.position,
                {
                    y: -3 + Math.random() * -3,
                    x: (2 + Math.random() * 3) * (ripSide - 0.5),
                },
                0,
            );
            removeAnimation.to(
                side.mesh.rotation,
                {
                    z: (-2 + Math.random() * -3) * (ripSide - 0.5),
                },
                0,
            );
        });
    }

    destroyMe() {
        this.sheetPlane.dispose();
        this.sides.forEach((side) => {
            side.material.dispose();
            this.group.remove(side.mesh);
        });
    }
}

function TearingPaperPhoto({
    images = DEFAULT_IMAGES,
    ripTextureSrc = "/assets/rip-texture.jpg",
    sheetWidth = DEFAULT_SHEET_WIDTH,
    sheetHeight = DEFAULT_SHEET_HEIGHT,
    borderSize = DEFAULT_BORDER_SIZE,
    className,
    showHandHint = false,
    handHintDelay = 1200,
    autoTear = true,
    autoTearInterval = 3200,
}: TearingPaperPhotoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const hand = handRef.current;

        if (!canvas) {
            return;
        }

        let animationFrame = 0;
        let interacted = false;
        let mouseDown = false;
        let disposed = false;
        let autoTearTimer: number | undefined;

        const mouseStart = new Vector2();
        const photos: Photo[] = [];
        const imageEntries: ImageEntry[] = [];
        let currentImage = -1;

        const stage = new Stage(canvas);
        stage.fitPhoto(sheetHeight);
        const container = containerRef.current;
        const loaderColor = container
            ? getComputedStyle(container).backgroundColor
            : "transparent";
        const loaderScreen = new LoaderOverlay(loaderColor);
        stage.add(loaderScreen.mesh);

        let initialized = false;
        const onReady = () => {
            if (initialized || disposed) {
                return;
            }
            initialized = true;

            gsap.to(loaderScreen, {
                alpha: 0,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    stage.scene.remove(loaderScreen.mesh);
                    (loaderScreen.mesh.material as ShaderMaterial).dispose();
                },
            });

            init();
        };

        // Safety fallback timer so it NEVER hangs
        const safetyTimer = window.setTimeout(onReady, 350);

        const loadingManager = new LoadingManager(() => {
            window.clearTimeout(safetyTimer);
            onReady();
        });

        const textureLoader = new TextureLoader(loadingManager);

        images.forEach((image) => {
            if (image.canvas) {
                const texture = new CanvasTexture(image.canvas);
                texture.minFilter = LinearFilter;
                texture.magFilter = LinearFilter;
                texture.generateMipmaps = false;

                imageEntries.push({
                    texture,
                    imageSize: new Vector2(image.canvas.width, image.canvas.height),
                });
                return;
            }

            const src = image.src || "";
            const entry: ImageEntry = {
                texture: null as unknown as Texture,
                imageSize: new Vector2(DEFAULT_SHEET_WIDTH, DEFAULT_SHEET_HEIGHT),
            };

            const texture = textureLoader.load(src, (loadedTex) => {
                const img = loadedTex.image as HTMLImageElement | undefined;
                if (img?.width && img?.height) {
                    entry.imageSize.set(img.width, img.height);
                    photos.forEach((p) => {
                        if (p.photoTexture === loadedTex) {
                            p.imageSize.copy(entry.imageSize);
                            p.updateUniforms();
                        }
                    });
                }
            });

            texture.minFilter = LinearFilter;
            texture.magFilter = LinearFilter;
            texture.generateMipmaps = false;

            entry.texture = texture;
            entry.imageSize = getImageDimensions(src, texture);

            imageEntries.push(entry);
        });

        // Generate procedural rip canvas texture with correct polarity:
        // Left is WHITE (kept by left piece), Right is BLACK (kept by right piece)
        const ripCanvas = document.createElement("canvas");
        ripCanvas.width = 256;
        ripCanvas.height = 512;
        const ripCtx = ripCanvas.getContext("2d");
        if (ripCtx) {
            ripCtx.fillStyle = "black";
            ripCtx.fillRect(0, 0, 256, 512);
            ripCtx.fillStyle = "white";
            for (let y = 0; y < 512; y++) {
                const edge = 128 + 32 * Math.sin(y * 0.04) + 14 * Math.cos(y * 0.11) + (Math.random() * 6 - 3);
                // Fill left side with WHITE
                ripCtx.fillRect(0, y, edge, 1);
            }
        }
        const textureRip = new CanvasTexture(ripCanvas);

        const envLight = new AmbientLight("white", 6);
        stage.add(envLight);

        const pointLight = new PointLight("white", 20);
        pointLight.position.z = -1;
        stage.add(pointLight);

        const getMousePos = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            return {
                x: (x / (rect.width || stage.sizes.width)) * 2 - 1,
                y: -((y / (rect.height || stage.sizes.height)) * 2 - 1),
            };
        };

        const hideHand = () => {
            if (!hand) {
                return;
            }

            gsap.to(hand, {
                opacity: 0,
                onComplete: () => hintAnimation.pause(),
            });
        };

        const down = (x: number, y: number) => {
            if (!photos.length || !photos[0].interactive) {
                return;
            }

            interacted = true;
            hideHand();

            const pos = getMousePos(x, y);
            mouseStart.x = pos.x;
            mouseStart.y = pos.y;
            mouseDown = true;
        };

        const move = (x: number, y: number) => {
            if (!mouseDown || !photos.length || !photos[0].interactive) {
                return;
            }

            const pos = getMousePos(x, y);
            const distanceY = mouseStart.y - pos.y;

            photos[0].sheetSettings.tearAmount = Math.max(2 * distanceY, 0);
            photos[0].updateUniforms();
        };

        const up = () => {
            if (!mouseDown || !photos.length || !photos[0].interactive) {
                return;
            }

            mouseDown = false;
            photos[0].completeRip();
        };

        const triggerAutoTear = () => {
            if (disposed || !photos.length || !photos[0].interactive) {
                return;
            }
            const currentPhoto = photos[0];
            gsap.to(currentPhoto.sheetSettings, {
                tearAmount: 1.6,
                duration: 1.2,
                ease: "power2.inOut",
                onUpdate: () => currentPhoto.updateUniforms(),
                onComplete: () => {
                    if (!disposed && currentPhoto.interactive) {
                        currentPhoto.remove();
                    }
                },
            });
        };

        const scheduleAutoTear = () => {
            if (!autoTear || disposed) return;
            if (autoTearTimer) window.clearTimeout(autoTearTimer);
            autoTearTimer = window.setTimeout(() => {
                triggerAutoTear();
            }, autoTearInterval);
        };

        const addNewPhoto = () => {
            currentImage += 1;
            if (currentImage >= imageEntries.length) {
                currentImage = 0;
            }

            mouseDown = false;

            const nextImage = imageEntries[currentImage];
            const photo = new Photo(
                {
                    photo: nextImage.texture,
                    rip: textureRip,
                    imageSize: nextImage.imageSize.clone(),
                },
                () => addNewPhoto(),
                { width: sheetWidth, height: sheetHeight, borderSize },
            );

            photos.unshift(photo);
            stage.add(photo.group);

            scheduleAutoTear();
        };

        const onMouseDown = (event: MouseEvent) => {
            // Only capture if clicking directly on the canvas with left button
            if (event.button === 0) {
                down(event.clientX, event.clientY);
            }
        };
        const onTouchStart = (event: TouchEvent) => {
            // Allow native scrolling, only track multi-touch or passive drag if needed
            if (event.touches.length === 1) {
                down(event.touches[0].clientX, event.touches[0].clientY);
            }
        };
        const onMouseMove = (event: MouseEvent) => {
            if (mouseDown) {
                move(event.clientX, event.clientY);
            }
        };
        const onTouchMove = (event: TouchEvent) => {
            if (mouseDown && event.touches.length === 1) {
                move(event.touches[0].clientX, event.touches[0].clientY);
            }
        };

        const init = () => {
            addNewPhoto();

            if (canvas) {
                canvas.addEventListener("mousedown", onMouseDown);
                canvas.addEventListener("touchstart", onTouchStart, { passive: true });
            }
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove, { passive: true });
            window.addEventListener("mouseup", up);
            window.addEventListener("touchend", up);
        };

        const tick = () => {
            stage.render();
            animationFrame = window.requestAnimationFrame(tick);
        };

        tick();

        const downDuration = 2;
        const upDuration = 0.7;

        const hintAnimation = gsap.timeline({
            repeat: -1,
            defaults: { duration: downDuration, ease: "power4.inOut" },
            paused: true,
        });

        if (hand && showHandHint) {
            hintAnimation
                .fromTo(hand, { y: "-100%" }, { y: "100%" })
                .to(
                    hand,
                    {
                        y: "-100%",
                        rotation: -10,
                        duration: upDuration,
                    },
                    downDuration,
                )
                .to(
                    hand,
                    {
                        rotation: 0,
                        duration: upDuration * 0.3,
                    },
                    downDuration + upDuration * 0.7,
                )
                .to(
                    hand,
                    {
                        rotation: -25,
                        scale: 1.1,
                        duration: upDuration * 0.5,
                        ease: "power4.in",
                    },
                    downDuration,
                )
                .to(
                    hand,
                    {
                        rotation: 0,
                        scale: 1,
                        duration: upDuration * 0.5,
                        ease: "power4.out",
                    },
                    downDuration + upDuration * 0.5,
                );

            const showHand = () => {
                if (!interacted) {
                    hintAnimation.play();
                    gsap.to(hand, { opacity: 1 });
                }
            };

            window.setTimeout(showHand, handHintDelay);
        }

        return () => {
            disposed = true;
            if (autoTearTimer) window.clearTimeout(autoTearTimer);
            window.cancelAnimationFrame(animationFrame);
            if (canvas) {
                canvas.removeEventListener("mousedown", onMouseDown);
                canvas.removeEventListener("touchstart", onTouchStart);
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mouseup", up);
            window.removeEventListener("touchend", up);
            hintAnimation.kill();
            gsap.killTweensOf(hand);
            stage.dispose();
        };
    }, [
        images,
        ripTextureSrc,
        sheetWidth,
        sheetHeight,
        borderSize,
        showHandHint,
        handHintDelay,
        autoTear,
        autoTearInterval,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative min-h-[480px] w-full overflow-hidden bg-background [touch-action:pan-y]",
                className,
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-2 cursor-grab active:cursor-grabbing w-full h-full [touch-action:pan-y]"
            />
            {showHandHint && (
                <svg
                    ref={handRef}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-16 -translate-x-1/2 -translate-y-1/2 opacity-0 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                >
                    <path
                        d="M18 10C18 7.79086 19.7909 6 22 6C24.2091 6 26 7.79086 26 10V22.5L27.5 21C29.433 19.067 32.567 19.067 34.5 21C36.433 22.933 36.433 26.067 34.5 28L28 34.5C23.5817 38.9183 16.4183 38.9183 12 34.5L8 30.5C6.067 28.567 6.067 25.433 8 23.5C9.933 21.567 13.067 21.567 15 23.5L18 26.5V10Z"
                        fill="white"
                        stroke="#0f172a"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />
                    {/* Ripple / tear cue ring */}
                    <circle cx="22" cy="10" r="4" fill="#38bdf8" fillOpacity="0.4" />
                </svg>
            )}
        </div>
    );
}

export { TearingPaperPhoto };
