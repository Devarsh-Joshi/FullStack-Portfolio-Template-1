# Portfolio Customization Guide

Complete guide to customize colors, links, images, and details in your portfolio website.

---

## Table of Contents

1. [Color Customization](#color-customization)
2. [Links Customization](#links-customization)
3. [Images & Assets](#images--assets)
4. [Portfolio Content Details](#portfolio-content-details)
5. [Text & Typography](#text--typography)
6. [Quick Reference](#quick-reference)

---

## Color Customization

### Overview
Your portfolio uses a dark theme with blue/indigo accents. All colors are defined in CSS custom properties (CSS variables) in the `index.css` file.

### Location: `client/src/index.css`

#### Primary Color Scheme Variables

The color system is defined in the `:root` section. Here are the key colors:

**Base Colors:**
- **`--background`**: Dark blue background (220 39% 11%)
- **`--foreground`**: Light text color (210 40% 98%)
- **`--card`**: Card background (220 35% 14%)
- **`--border`**: Border color (217 33% 20%)
- **`--primary`**: Primary brand color - Blue (213 50% 45%)
- **`--accent`**: Accent color - Cyan (200 80% 60%)

**Gradient Colors:**
- **Text Gradient**: `linear-gradient(135deg, #7dd3fc 0%, #3F5E96 50%, #a5b4fc 100%)`
- **Background Gradient**: `linear-gradient(135deg, #141E30 0%, #243B55 50%, #3F5E96 100%)`

#### How to Change Colors

Each color uses HSL format: `hue saturation% lightness%`

**Step 1:** Find the color you want to change in `:root`
```css
:root {
  --primary: 213 50% 45%;        /* HSL format */
  --accent: 200 80% 60%;
}
```

**Step 2:** Modify the HSL values:
- **Hue** (0-360): Red=0°, Yellow=60°, Green=120°, Cyan=180°, Blue=240°, Magenta=300°
- **Saturation** (0-100%): 0% = gray, 100% = full color
- **Lightness** (0-100%): 0% = black, 50% = normal, 100% = white

**Example:** Change primary color from blue to purple:
```css
/* Before */
--primary: 213 50% 45%;

/* After */
--primary: 270 50% 45%;  /* Changed hue from 213 to 270 (purple) */
```

**Example:** Make accent color brighter/more vibrant:
```css
/* Before */
--accent: 200 80% 60%;

/* After */
--accent: 200 100% 50%;  /* Increased saturation to 100%, reduced lightness to 50% */
```

#### Gradient Customization

Update gradient colors for hero section and text:

**Text Gradient (affecting headings, buttons):**
```css
.text-gradient {
  background: linear-gradient(135deg, #7dd3fc 0%, #3F5E96 50%, #a5b4fc 100%);
}
```
- Replace hex colors with your own: `#7dd3fc` → your color
- Tools: Use [colorhexa.com](https://www.colorhexa.com/) to find hex codes

**Background Gradient (main background):**
```css
body {
  background: linear-gradient(135deg, #141E30 0%, #243B55 50%, #3F5E96 100%);
}
```

#### Shadow Customization

Shadows use blue accent colors. Modify to match your theme:

```css
--shadow-sm: 0 0 40px rgba(63, 94, 150, 0.2);  /* RGB color: 63, 94, 150 */
--shadow-md: 0 0 60px rgba(63, 94, 150, 0.3);
```

Change `rgba(63, 94, 150, 0.2)` to match your new primary color's RGB value.

#### Color Palette Generator
Use these tools to create harmonious color schemes:
- [Coolors.co](https://coolors.co/) - Generate color palettes
- [Color Hunt](https://colorhunt.co/) - Find pre-made palettes
- [HSL Color Picker](https://www.w3schools.com/colors/colors_hsl.asp) - Interactive HSL picker

---

## Links Customization

### Social Media Links

**Location:** `client/src/components/portfolio/Footer.tsx`

Find the `socialLinks` array:
```tsx
const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
];
```

**To update:**
1. Replace the `href` URL with your actual profile:
```tsx
{ icon: Github, href: 'https://github.com/your-username', label: 'GitHub' },
{ icon: Linkedin, href: 'https://linkedin.com/in/your-profile', label: 'LinkedIn' },
```

2. To add more social links:
```tsx
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/your-username', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/your-profile', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/your-handle', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/your-handle', label: 'Instagram' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
];
```

**Available Icons:** (from `lucide-react`)
- `Github`, `Linkedin`, `Twitter`, `Instagram`, `Mail`, `Facebook`, `Youtube`, `Dribbble`, `Behance`, `Code2`, `Rss`, etc.

### Navigation Links

**Location:** `client/src/components/portfolio/Navigation.tsx`

The navigation menu links are defined here:
```tsx
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];
```

**To modify:**
- Change section names by updating the `name` field
- Ensure `href` matches the corresponding section's `id` in [Portfolio.tsx](Portfolio.tsx)

### Footer Links

**Location:** `client/src/components/portfolio/Footer.tsx`

```tsx
const footerLinks = ['Home', 'About', 'Work', 'Skills', 'Contact'];
```

Update to match your navigation structure.

### External Project Links

**Location:** `client/src/components/portfolio/Projects.tsx`

Find the projects array and update:
```tsx
const projects = [
  {
    title: 'Project Name',
    description: 'Project description',
    image: '/path/to/image.jpg',
    link: 'https://project-link.com',
    tags: ['Tech1', 'Tech2'],
  },
  // Add more projects...
];
```

---

## Images & Assets

### Where to Store Images

**Public Assets Location:** `client/public/`

Create folders:
- `client/public/images/` - Portfolio images
- `client/public/projects/` - Project screenshots
- `client/public/logos/` - Technology logos

### Adding Project Images

**File:** `client/src/components/portfolio/Projects.tsx`

Update image paths:
```tsx
{
  title: 'My Awesome Project',
  image: '/images/project-thumbnail.jpg',  // Path in public folder
  link: 'https://github.com/username/project',
}
```

**Image Requirements:**
- **Recommended Size:** 800×600px or 16:9 aspect ratio
- **File Format:** JPG, PNG, WebP
- **File Size:** Keep under 200KB for better performance

### Adding Hero Section Image/Animation

**Location:** `client/src/components/portfolio/Hero.tsx`

The hero section uses Three.js for 3D animation. To replace with a static image:

```tsx
// Find the Scene component and replace with:
<img 
  src="/images/hero-image.jpg" 
  alt="Hero"
  className="w-full h-full object-cover"
/>
```

### Adding Profile/Avatar Image

**Location:** `client/src/components/portfolio/About.tsx`

Add an image in the About section:
```tsx
<img 
  src="/images/profile-photo.jpg"
  alt="Profile"
  className="w-32 h-32 rounded-full object-cover"
/>
```

### Background Images

To add a background image instead of gradient:

**Edit:** `client/src/index.css`

```css
body {
  /* Replace gradient with image */
  background: url('/images/bg-pattern.jpg') center/cover;
  /* Or combine image with gradient overlay */
  background: 
    linear-gradient(135deg, rgba(20, 30, 48, 0.9), rgba(36, 59, 85, 0.9)),
    url('/images/bg-pattern.jpg') center/cover;
}
```

---

## Portfolio Content Details

### Hero Section Content

**Location:** `client/src/components/portfolio/Hero.tsx`

Update the main heading and description:
```tsx
// Find and update these text elements:
<h1 className="text-5xl md:text-7xl font-serif font-bold">
  Your Name Here
</h1>
<p className="text-xl text-white/60">
  Your professional tagline or description
</p>
```

### About Section Content

**Location:** `client/src/components/portfolio/About.tsx`

Update your bio and information:
```tsx
<h2 className="text-3xl font-serif font-bold">About Me</h2>
<p className="text-lg text-white/70">
  Write your bio here. Talk about your background, experience, and what you're passionate about.
</p>
```

### Skills Section

**Location:** `client/src/components/portfolio/Skills.tsx`

Update your skills list:
```tsx
const skills = [
  'JavaScript/TypeScript',
  'React',
  'Node.js',
  'Tailwind CSS',
  'Three.js',
  'UI/UX Design',
  // Add your skills
];
```

### Projects Section

**Location:** `client/src/components/portfolio/Projects.tsx`

Update project list:
```tsx
const projects = [
  {
    title: 'Project Name',
    description: 'Brief description of what the project does and your role',
    image: '/images/project1.jpg',
    link: 'https://github.com/username/project',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Another Project',
    description: 'More details about this project',
    image: '/images/project2.jpg',
    link: 'https://live-project-url.com',
    tags: ['TypeScript', 'Next.js', 'Tailwind'],
  },
  // Add more projects...
];
```

**Best Practices:**
- Add 3-5 of your best projects
- Include a live demo link or GitHub repo
- Use clear, descriptive titles
- Write 1-2 sentences explaining each project

### Contact Section

**Location:** `client/src/components/portfolio/Contact.tsx`

Update your contact information:
```tsx
<h2 className="text-3xl font-serif font-bold">Get In Touch</h2>
<p className="text-lg text-white/70">
  I'd love to hear from you. Feel free to reach out!
</p>
<a href="mailto:your@email.com" className="btn">
  Send me an email
</a>
```

### Personal Information

**Location:** `client/src/components/portfolio/Footer.tsx`

Update your name in the footer:
```tsx
<span className="font-serif text-xl font-bold text-white">
  Your Name Here
</span>
```

Update copyright year (automatically updates):
```tsx
© {new Date().getFullYear()} Your Name. All rights reserved.
```

---

## Text & Typography

### Font Families

The portfolio uses three font families (defined in `client/src/index.css`):

```css
--font-sans: 'Space Grotesk', sans-serif;   /* Body text */
--font-serif: 'Syne', sans-serif;           /* Headings */
--font-mono: 'JetBrains Mono', monospace;   /* Code blocks */
```

### Changing Fonts

To use different fonts:

1. **Import new fonts in `index.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
```

2. **Update CSS variables:**
```css
--font-sans: 'Inter', sans-serif;
--font-serif: 'Playfair Display', serif;
--font-mono: 'Fira Code', monospace;
```

3. **Or use Tailwind classes directly:**
```tsx
<h1 className="font-serif text-5xl">  <!-- Uses --font-serif -->
<p className="font-sans">             <!-- Uses --font-sans -->
<code className="font-mono">           <!-- Uses --font-mono -->
```

### Text Size

Common Tailwind text sizes:
- `text-xs` = Extra small (12px)
- `text-sm` = Small (14px)
- `text-base` = Base (16px)
- `text-lg` = Large (18px)
- `text-xl` = Extra large (20px)
- `text-2xl` = 2XL (24px)
- `text-3xl` = 3XL (30px)
- `text-4xl` = 4XL (36px)
- `text-5xl` = 5XL (48px)
- `text-6xl` = 6XL (60px)
- `text-7xl` = 7XL (72px)

**Example:** Make a heading larger:
```tsx
{/* Before */}
<h2 className="text-3xl font-serif font-bold">About</h2>

{/* After */}
<h2 className="text-5xl font-serif font-bold">About</h2>
```

### Text Colors

**Common Tailwind text colors:**
- `text-white` - White
- `text-white/70` - White at 70% opacity
- `text-white/50` - White at 50% opacity
- `text-white/30` - White at 30% opacity
- `text-sky-400` - Sky blue
- `text-blue-600` - Dark blue

**Gradient text:**
```tsx
<h1 className="text-gradient">
  Text with gradient color
</h1>
```

---

## Quick Reference

### File Locations Summary

| Component | File | Change |
|-----------|------|--------|
| Colors & Gradients | `client/src/index.css` | Modify CSS variables in `:root` |
| Social Links | `client/src/components/portfolio/Footer.tsx` | Update `socialLinks` array |
| Navigation | `client/src/components/portfolio/Navigation.tsx` | Update `navLinks` array |
| Hero Content | `client/src/components/portfolio/Hero.tsx` | Update heading and tagline |
| About Section | `client/src/components/portfolio/About.tsx` | Update bio and description |
| Skills List | `client/src/components/portfolio/Skills.tsx` | Update `skills` array |
| Projects | `client/src/components/portfolio/Projects.tsx` | Update `projects` array |
| Contact Info | `client/src/components/portfolio/Contact.tsx` | Update email and text |
| Footer Info | `client/src/components/portfolio/Footer.tsx` | Update name and links |
| Images | `client/public/images/` | Add your images here |

### Color Format Guide

**Converting Between Formats:**

**Hex to RGB:**
- `#7dd3fc` = RGB(125, 211, 252)
- Use online converter: [RGBtoHex.com](https://www.rgbtohex.com/)

**RGB to HSL:**
- RGB(125, 211, 252) = HSL(198, 96%, 74%)
- Use: [Color Converter](https://convertingcolors.com/)

**HSL for CSS:**
```css
/* Format: hue saturation% lightness% */
--primary: 213 50% 45%;  /* This is valid CSS */

/* Or use full hsl() function */
color: hsl(213 50% 45%);
```

### Common Tailwind Utilities

```tsx
/* Spacing */
className="p-4"           /* Padding: 1rem */
className="m-6"           /* Margin: 1.5rem */
className="gap-3"         /* Gap between flex items: 0.75rem */

/* Display */
className="flex"          /* Flexbox */
className="grid"          /* Grid layout */
className="hidden md:flex" /* Hidden on mobile, flex on desktop */

/* Background & Borders */
className="bg-white/10"   /* Background with 10% opacity */
className="border"        /* Add border */
className="rounded-lg"    /* Border radius */

/* Text */
className="text-center"   /* Center text */
className="font-bold"     /* Bold */
className="uppercase"     /* Uppercase */

/* Effects */
className="opacity-50"    /* 50% opacity */
className="grayscale"     /* Grayscale filter */
className="blur"          /* Blur effect */
```

---

## Best Practices

### 1. **Maintain Consistency**
- Use the same color palette throughout
- Keep font choices limited (2-3 fonts max)
- Use consistent spacing between sections

### 2. **Accessibility**
- Ensure text has enough contrast with background
- Use alt text for all images
- Keep text sizes readable (minimum 16px for body text)

### 3. **Performance**
- Optimize images (use tools like TinyPNG or ImageOptim)
- Use WebP format when possible
- Keep CSS variables organized and named clearly

### 4. **Mobile Responsiveness**
- Always test on mobile devices
- Use responsive classes: `md:`, `lg:`, `sm:`
- Ensure touch targets are at least 44×44px

### 5. **SEO & Metadata**
Update the HTML head in `client/index.html`:
```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Professional portfolio of Your Name">
<meta name="keywords" content="developer, designer, web development">
```

---

## Troubleshooting

### Colors Not Changing?
1. Check you're editing `client/src/index.css` not another CSS file
2. Restart the dev server after changing CSS variables
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check for typos in CSS variable names

### Images Not Showing?
1. Verify image is in `client/public/` folder
2. Path should start with `/` (e.g., `/images/photo.jpg`)
3. Check file format is supported (JPG, PNG, WebP)
4. Ensure file name matches exactly (case-sensitive on Linux/Mac)

### Links Not Working?
1. Verify URLs include `https://` or `mailto:`
2. Check for trailing spaces in URLs
3. Test links in new tab/window
4. Use [link checker tools](https://www.w3schools.com/whatis/whatis_linkchecker.asp)

### Text Not Appearing?
1. Check text color contrasts with background
2. Verify font sizes (may be too small)
3. Check opacity classes (e.g., `text-white/30` is very faint)
4. Inspect element in browser DevTools (F12)

---

## Need More Help?

- **Tailwind CSS Docs:** [tailwindcss.com](https://tailwindcss.com/docs)
- **CSS Variables:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- **React Docs:** [react.dev](https://react.dev)
- **Lucide Icons:** [lucide.dev](https://lucide.dev)

---

**Happy customizing! 🚀**
