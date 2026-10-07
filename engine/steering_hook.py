"""
LexicalLayer - Activation Steering & Latent Vector Extractor
Representation Engineering (RepE) Core for Transformer Architectures.
Computes activation difference vectors between authentic corporate corpus
and synthetic slop, injecting them into residual streams in real time.
"""

import os
import json
import torch
import torch.nn as nn
from typing import Dict, List, Optional, Tuple, Any
from safetensors.torch import save_file, load_file

class ActivationSteeringHook:
    """
    Hooks directly into transformer hidden layers (residual stream or MLP output)
    and modifies the forward activations by adding/subtracting steering vectors:
    h_{l} = h_{l} + alpha * v_{l}
    """
    def __init__(self, layer_idx: int, vector: torch.Tensor, alpha: float = 1.0):
        self.layer_idx = layer_idx
        self.vector = vector
        self.alpha = alpha
        self.handle = None

    def hook_fn(self, module: nn.Module, input_tensor: Any, output_tensor: Any):
        # Transformer layer output can be a tensor or a tuple (hidden_states, ...)
        if isinstance(output_tensor, tuple):
            hidden_states = output_tensor[0]
            rest = output_tensor[1:]
        else:
            hidden_states = output_tensor
            rest = None

        if self.vector is not None and self.alpha != 0.0:
            # Ensure vector is on the same device and dtype as hidden states
            vec = self.vector.to(device=hidden_states.device, dtype=hidden_states.dtype)
            # Broadcasting across batch and sequence length
            # hidden_states: [batch_size, seq_len, hidden_dim]
            hidden_states = hidden_states + (self.alpha * vec)

        if rest is not None:
            return (hidden_states,) + rest
        return hidden_states

    def register(self, layer_module: nn.Module):
        self.handle = layer_module.register_forward_hook(self.hook_fn)
        return self

    def remove(self):
        if self.handle:
            self.handle.remove()
            self.handle = None


class ContrastiveVectorExtractor:
    """
    Extracts directional vectors in latent space using contrastive pairs:
    V_layer = mean(Activations(Positive_Corpus)) - mean(Activations(Negative_Corpus))
    Normalized to unit sphere for stable mathematical steering.
    """
    def __init__(self, hidden_dim: int = 4096, num_layers: int = 32):
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        self.steering_vectors: Dict[int, torch.Tensor] = {}

    def extract_from_activations(
        self,
        positive_activations: Dict[int, torch.Tensor],
        negative_activations: Dict[int, torch.Tensor]
    ) -> Dict[int, torch.Tensor]:
        """
        Calculates contrastive difference vectors layer-by-layer:
        v_l = normalize(E[h_l^+] - E[h_l^-])
        """
        extracted = {}
        for layer_idx in positive_activations:
            if layer_idx in negative_activations:
                pos_mean = positive_activations[layer_idx].mean(dim=(0, 1)) # [hidden_dim]
                neg_mean = negative_activations[layer_idx].mean(dim=(0, 1)) # [hidden_dim]
                diff = pos_mean - neg_mean
                # L2 Normalization
                norm = torch.norm(diff, p=2)
                if norm > 1e-7:
                    unit_vector = diff / norm
                else:
                    unit_vector = diff
                extracted[layer_idx] = unit_vector

        self.steering_vectors = extracted
        return extracted

    def save_safetensors(self, output_path: str, metadata: Optional[Dict[str, str]] = None):
        """Saves extracted vectors as production-ready SafeTensors"""
        tensor_dict = {f"layer_{k}_vector": v for k, v in self.steering_vectors.items()}
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        save_file(tensor_dict, output_path, metadata=metadata)

    def load_safetensors(self, filepath: str) -> Dict[int, torch.Tensor]:
        """Loads steering vectors from a SafeTensors file"""
        tensors = load_file(filepath)
        vectors = {}
        for k, v in tensors.items():
            if k.startswith("layer_") and k.endswith("_vector"):
                layer_num = int(k.replace("layer_", "").replace("_vector", ""))
                vectors[layer_num] = v
        self.steering_vectors = vectors
        return vectors
