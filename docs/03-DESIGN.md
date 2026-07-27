# Design System — Neo-Brutalist High-Contrast Developer Theme

## Satyapradip Das — Portfolio Website

---

## 1. Design Philosophy

**Neo-Brutalist + High-Contrast + Developer-First + Punchy Typography**

Inspired by standard high-impact brutalist web design:
- 3px solid dark borders (`#151b29`).
- Hard offset box shadows (`box-shadow: 6px 6px 0px #151b29` & `4px 4px 0px #151b29`).
- Heavy, bold display typography using **Montserrat** (700, 800, 900) and **Work Sans** (body & labels).
- Vibrant color accents (Yellow `#f5a623`, Teal `#00696e`, Cyan `#61f4fd`, Crimson `#bd0041`).
- Background dot grid matrix (`radial-gradient(#d4d9ed 1px, transparent 1px)` with `background-size: 24px 24px`).

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--surface` / `--background` | `#faf8ff` | Off-white background with radial dot grid |
| `--on-surface` / `--border` | `#151b29` | Deep dark blue-black for text & 3px borders |
| `--primary-container` | `#f5a623` | Vibrant yellow badge highlight |
| `--secondary` | `#00696e` | Deep teal section background (Featured Work) |
| `--secondary-container` | `#61f4fd` | Bright electric cyan for hover & buttons |
| `--tertiary` | `#bd0041` | Crimson red CTA buttons & section banners |
| `--tertiary-container` | `#ff99a5` | Soft pink badge highlights |
| `--surface-container-high` | `#e2e8fc` | Card container tint |

---

## 3. Typography Stack

- **Headlines & Display:** `Montserrat` (weights: 700, 800, 900)
- **Body & Labels:** `Work Sans` (weights: 400, 500, 700)

---

## 4. Key Neo-Brutalist Utility Classes

```css
.brutalist-border {
  border: 3px solid #151b29;
}

.brutalist-shadow {
  box-shadow: 6px 6px 0px #151b29;
}

.brutalist-shadow-sm {
  box-shadow: 4px 4px 0px #151b29;
}

.brutalist-shadow-hover:hover {
  box-shadow: 2px 2px 0px #151b29;
  transform: translate(4px, 4px);
}
```
