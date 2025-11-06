# Design Guidelines for Elhardouf Portfolio Website

## Design Approach
**Reference-Based + Custom Creative**: Highly animated, modern developer portfolio with Three.js 3D elements, extensive GSAP animations, and parallax effects. Draw inspiration from award-winning creative developer portfolios (Awwwards-style) with a focus on technical sophistication and visual impact.

## Color Palette
- **Primary**: Dark Blue (#0B1F3F)
- **Accent**: Neon Green (#00FF94)
- **Light**: White (#FFFFFF)
- **Gradients**: Use for buttons and hover effects (combine primary + accent)

## Typography
- **Headings**: Montserrat or Poppins (700, 600 weights)
- **Body**: Roboto or Open Sans (400, 500 weights)
- **Sizes**: Large headings (4xl-6xl), subheadings (2xl-3xl), body (base-lg)

## Layout System
- **Spacing Units**: Tailwind 4, 8, 12, 16, 20, 24, 32 for consistent rhythm
- **Container**: max-w-7xl for content sections
- **Section Padding**: py-20 to py-32 on desktop, py-12 to py-16 on mobile

## Sections & Components

### 1. Hero Section (Full Screen)
- Full viewport height with Three.js animated background (floating geometric shapes, particles, or abstract code elements)
- Parallax effect on background layers
- **Heading**: "Hi, I'm Elhardouf – I Build Apps & Websites"
- **Subheading**: "Freelance Developer | React Native, React.js, Express.js | Turning Ideas Into Digital Reality"
- Two prominent CTAs: "View My Work" + "Contact Me" with blurred backgrounds and gradient hover effects
- Typing animation effect using GSAP (blinking cursor on code snippet or tech stack list)
- Smooth scroll indicator at bottom

### 2. About Me Section
- Two-column layout: Profile image (left) + Text content (right)
- GSAP fade-in from left/right on scroll
- Profile image with subtle hover animation
- Bio paragraph with highlighted keywords
- Animated tech stack icons grid (React Native, React.js, Node.js, Express.js, MySQL, Expo)
- Icons appear with GSAP stagger effect on scroll

### 3. Skills Section
- Grid layout with animated circular progress bars (4 columns desktop, 2 tablet, 1 mobile)
- Each skill shows percentage with GSAP counter animation
- Hover tooltips showing years of experience or project count
- Skills: React Native, React.js, Express.js, Node.js, MySQL, etc.
- Smooth GSAP timeline animations on scroll trigger

### 4. Portfolio/Projects Section
- Filterable grid (All / Mobile Apps / Websites / Backend / Full Stack)
- Project cards with:
  - Screenshot/mockup with subtle 3D tilt effect on hover
  - Project title and description
  - Tech stack icon badges
  - "View Project" or "Live Demo" button
- Cards slide up and fade in with GSAP on scroll
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)

### 5. Services Section
- 4 service cards in grid layout
- Each card includes:
  - Animated icon (GSAP micro-interactions)
  - Service title
  - Description list
  - Hover scale effect with neon glow
- Services: Mobile Apps, Web Development, Backend & API, Consulting
- Cards reveal with stagger animation on scroll

### 6. Testimonials Section
- Horizontal carousel with smooth GSAP transitions
- Each testimonial card: quote, client name, role/company
- Auto-play with pause on hover
- Navigation arrows and dots
- Fade-in/slide-in animations

### 7. Contact Section
- Two-column layout: Form (left) + Contact info & social links (right)
- Form with floating label animations
- Fields: Name, Email, Message
- Submit button with gradient and hover animation
- Social links: LinkedIn, GitHub, WhatsApp with hover scale
- Display email: hi@elhrdouf.com
- Background with subtle Three.js particle effect

### 8. Footer
- Three-column layout: Logo/tagline, Quick links, Social media
- Quick links: Home, About, Portfolio, Services, Contact
- Copyright: "© 2025 Elhardouf.com"
- Signature: "Designed & Developed by Me"
- Minimal padding, clean design

## Animations & Effects

### GSAP Implementations
- **ScrollTrigger**: All sections fade/slide in on scroll entry
- **Parallax**: Hero background, section backgrounds move at different speeds
- **Stagger Animations**: Tech icons, skill bars, project cards appear sequentially
- **Typing Effect**: Hero section text animation with blinking cursor
- **Counter Animations**: Skills percentages count up on view
- **Hover Effects**: Scale, glow, gradient shifts on interactive elements

### Three.js Elements
- **Hero Background**: Floating geometric shapes (icosahedrons, spheres) with rotation
- **Particle Systems**: Subtle particles throughout page (stars, dots, code symbols)
- **Interactive 3D**: Mouse-responsive elements that tilt or rotate
- **Performance**: Optimize for 60fps, reduce complexity on mobile

## Multilingual Support (i18next)
- Language toggle in header (EN/AR switch with flag icons)
- RTL layout support when Arabic selected
- All text content translatable
- Smooth transition animation when switching languages

## Additional Features
- **Dark Mode Toggle**: Sun/moon icon with GSAP theme transition
- **Floating Elements**: Social media icons fixed on side, code snippets floating in background
- **Smooth Scrolling**: GSAP smooth scroll implementation
- **Lazy Loading**: Images load as user scrolls
- **Loading Animation**: Creative loader with GSAP animation before site reveal

## Responsive Strategy
- Desktop-first approach with mobile breakpoints
- 3D effects simplified/disabled on mobile for performance
- Touch-optimized interactions
- Hamburger menu for mobile navigation

## Images
- **Hero**: Optional subtle tech-themed background image with parallax (circuit boards, code, abstract tech)
- **About**: Professional headshot/profile photo
- **Portfolio**: High-quality project screenshots/mockups for each project card
- **Services**: Icon-based (no photos needed)

All buttons on images use blurred glass-morphism backgrounds for readability.