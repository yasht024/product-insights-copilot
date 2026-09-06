---
name: Product Insights Copilot
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383941'
  surface-container-lowest: '#0d0e15'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#292931'
  surface-container-highest: '#33343c'
  on-surface: '#e3e1ec'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e3e1ec'
  inverse-on-surface: '#2f3038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#12131a'
  on-background: '#e3e1ec'
  surface-variant: '#33343c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.03em
  display-sm:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  display-sm-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.015em
  title-md:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: '500'
    lineHeight: '1.45'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: '1.45'
    letterSpacing: 0.005em
  mono-metric:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  sidebar-w: 16rem
  inspector-w: 26rem
  gutter-desktop: 1.5rem
  margin-desktop: 2rem
---

## Brand & Style

This design system establishes a high-performance, intelligence-first environment tailored for product managers, engineering leads, and triage specialists. The aesthetic fuses technical precision with executive polish, evoking absolute command over complex, incoming product feedback and anomaly streams. 

### Design Movements & Visual Direction
The interface blends **Technical Minimalism** with **Subtle Glassmorphic Layering** and **Luminescent Accenting**:
- **Deep Obsidian Foundations:** The canvas recedes into near-black zinc tones to eliminate visual clutter and fatigue during marathon triage sessions.
- **Luminescent Energy:** AI-generated suggestions, dynamic synthesis, and anomaly clusters are communicated through controlled violet-to-indigo gradients and ambient backlights rather than flat iconography.
- **Tactile Edge Precision:** Glass surfaces avoid heavy frost or toy-like blurring; instead, they feature ultra-thin, semi-translucent borders (`rgba(255, 255, 255, 0.08)`) that create laser-sharp spatial definition.
- **Emotional Stance:** Calm, authoritative, hyper-responsive, and analytically rigorous.

## Colors

The palette operates strictly in dark mode, balancing deep neutral anchors with hyper-focused spectral highlights.

### Palette Roles
- **Canvas Base (`#09090B` / `zinc-950`):** The unshifting background ground for all views.
- **Surface Elevation 1 (`#18181B` / `zinc-900`):** Triage streams, inspector panels, and container cards.
- **Surface Elevation 2 (`#27272A` / `zinc-800`):** Nested panels, hover surfaces, and tooltips.
- **Primary Accent (`#6366F1` - Electric Indigo):** Primary triage actions, key state triggers, and copilot activation states.
- **Secondary Accent (`#A855F7` - Vivid Purple):** AI synthesized insights, thematic clustering tags, and predictive signals.
- **Tertiary Accent (`#06B6D4` - Cyber Cyan):** Live throughput indicators, streaming metrics, and real-time telemetry counters.
- **Border Utility (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`): Hairline demarcations separating dense visual data.

### Functional States
- **Signal Critical (P0 / Regression):** `#F43F5E` (Rose 500)
- **Signal Warning (Attention Needed):** `#F59E0B` (Amber 500)
- **Signal Positive (Resolved / Validated):** `#10B981` (Emerald 500)
- **Signal Informational:** Primary Indigo (`#6366F1`)

## Typography

The typographic hierarchy prioritizes micro-legibility in information-dense workflows. 

### Implementation Rules
- **Structural Text:** `Inter` handles all display, narrative, and operational UI strings, using tighter negative tracking on larger display tokens to maintain cohesion across dark backgrounds.
- **Telemetry & Metadata:** `JetBrains Mono` handles triage issue IDs, confidence percentages, telemetry timestamps, and status tags (`label-caps`). This provides instant visual differentiation between Copilot-generated text and factual system data.
- **Optical Optimization:** Light grey values (`#E4E4E7` / `zinc-200`) are favored over pure white (`#FFFFFF`) for standard body sizes to mitigate dark-mode halation. Pure white is reserved for active headers and highlighted metrics.

## Layout & Spacing

The architecture operates on an asymmetric 3-pane workbench layout constructed on a rigid 4px/8px incremental scale.

### Workbench Architecture
- **Left Navigation Rail (Fixed 64px to 256px):** System-level context, workspace directories, filters, and operational switches.
- **Center Triage Stream (Fluid):** Dynamic, priority-weighted feeds of raw telemetry, unified user issues, and categorized themes.
- **Right Copilot Inspector (Fixed 416px):** High-density AI analysis pane, root-cause synthesizers, automated ticket generation, and real-time vector graphs.

### Responsive Breakpoints & Adaptive Rules
- **Desktop (>= 1440px):** 3-pane persistent view. The right inspector remains fixed to allow simultaneous evaluation and action.
- **Laptop (1024px - 1439px):** Left rail compresses into an icon dock; inspector becomes a sliding drawer triggered by keyboard shortcut or issue selection.
- **Tablet & Mobile (< 1024px):** Single-pane sequential reflow. Cards collapse auxiliary metadata chips, reserving full screen width for the issue summary and primary resolution triggers.

## Elevation & Depth

Spatial layering relies on a strict combination of surface luminosity, hairline boundaries, and soft ambient light cones. Physical drop shadows cast by black silhouettes are prohibited.

### Tiers of Depth
- **Level 0 (Canvas):** Pure `#09090B`. Absorbent, zero reflection.
- **Level 1 (Panels & Cards):** `#121215` with a subtle 1px perimeter outline of `rgba(255, 255, 255, 0.08)`. Under soft hover states, the border transitions to `rgba(255, 255, 255, 0.16)`.
- **Level 2 (Active Inspections & Floating Modals):** `rgba(24, 24, 27, 0.85)` treated with `backdrop-filter: blur(16px)` and illuminated with a faint outer halo: `box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 16px 40px -8px rgba(0, 0, 0, 0.6)`.
- **Level 3 (Copilot Intelligence Glow):** Key elements infused with AI reasoning emit a subtle, non-distracting gradient backfield using radial falloffs: `radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)`.

## Shapes

The design system employs a refined, compact corner radius architecture (`Soft - 1`) to preserve maximum information density and communicate enterprise discipline.

### Geometry Specs
- **Data Cards, Modals, Panels:** `rounded-lg` (0.5rem / 8px).
- **Buttons, Text Inputs, Segmented Controls:** `rounded` (0.25rem / 4px to 6px).
- **Status Badges, Metric Indicators, Avatars:** `rounded-full` (Pill-shaped) to provide deliberate morphological contrast against rectangular containers.

## Components

### Buttons & Triggers
- **Primary / Copilot Action:** Subtle diagonal gradient (`linear-gradient(135deg, #6366F1, #8B5CF6)`), pure white text, hairline inset border (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25)`). Hover state intensifies lightness without scale expansion.
- **Secondary Action:** Transparent base, `rgba(255, 255, 255, 0.08)` border, `#D4D4D8` (zinc-300) text. Hover transitions background to `rgba(255, 255, 255, 0.05)`.
- **Ghost / Triage Utility:** Borderless, high-contrast monochrome hover (`#FFFFFF`), optimized for dense inline button groups.

### Input Fields & Copilot Prompt Bar
- **Standard Input:** Flat `#18181B` surface with 1px `rgba(255, 255, 255, 0.1)` border. Focus states feature a sharp glow: `box-shadow: 0 0 0 1px #6366F1, 0 0 12px rgba(99, 102, 241, 0.25)`.
- **Natural Language Copilot Bar:** Floating container anchored at the bottom of the viewport with a frosted glass backdrop (`blur(20px)`), perimeter glow, and embedded quick-action command chips.

### Cards & Triage Feed Items
- **Structure:** Edge-to-edge content layout separated by 1px horizontal dividers (`rgba(255, 255, 255, 0.06)`).
- **Active / Focused Item:** Outlined with a left border notch of 2px `#6366F1` and a background tint of `linear-gradient(90deg, rgba(99, 102, 241, 0.06) 0%, transparent 100%)`.

### Chips & Badges
- **Severity Badges:** High-saturation colored dot indicator accompanied by monospaced uppercase labels (`label-caps`) on low-opacity backgrounds (`rgba(244, 63, 94, 0.1)` for P0).
- **Cluster & Topic Tags:** `#1F1F23` base, 1px border, text rendered in muted zinc-300 with an optional prefix glyph representing data source (e.g., Slack, GitHub, Zendesk).

### Data Visualizations & Telemetry
- **Sparklines & Anomaly Charts:** Thin lines (1.5px) utilizing the Cyan-to-Indigo gradient spectrum (`#06B6D4` to `#6366F1`) paired with low-opacity vertical area gradients fading directly into the card canvas.
- **Grid Guides:** Hairline stroke (`0.5px`) with `rgba(255, 255, 255, 0.04)` to prevent chart grids from competing with real-time insight markers.