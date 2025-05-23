# Docs Starter Kit

A production-ready documentation site template built with Next.js 15, Nextra 4, Tailwind CSS v4, and all 28 shadcn/ui components pre-configured.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Nextra](https://img.shields.io/badge/Nextra-4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

## Features

- 🚀 **Next.js 15** with App Router and Turbopack for ultra-fast development
- 📝 **Nextra 4** for MDX-powered documentation with automatic navigation generation
- 🎨 **Tailwind CSS v4** with modern PostCSS setup and OKLCH color system
- 🧩 **All 28 shadcn/ui components** pre-configured and available in MDX (no imports needed!)
- 🌗 **Dark mode** support with automatic theme switching
- 📱 **Fully responsive** design that works on all devices
- ⚡ **TypeScript** ready with path aliases configured
- 🎯 **Zero configuration** - just write MDX and go!

## Quick Start

1. Clone this template:
```bash
git clone <your-repo-url>
cd docs-starter-kit
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

Your documentation site will be available at `http://localhost:3000`

## Project Structure

```
docs-starter-kit/
├── src/                      # All source code (keeps root clean)
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout with Nextra theme
│   │   └── [[...slug]]/      # Dynamic catch-all route
│   │       └── page.tsx      # Renders MDX content
│   ├── components/           
│   │   └── ui/              # 28 pre-configured shadcn/ui components
│   ├── content/             # Your documentation (MDX files)
│   │   ├── _meta.json       # Navigation structure
│   │   ├── index.mdx        # Homepage
│   │   └── guides/          # Nested sections
│   ├── lib/                 # Utilities
│   ├── app.css             # Global styles + Tailwind v4
│   └── mdx-components.tsx   # Component mappings
├── next.config.mjs          # Next.js + Nextra config
├── postcss.config.mjs       # PostCSS for Tailwind v4
├── components.json          # shadcn/ui config
└── package.json
```

## Writing Documentation

### 1. Create Pages

Add `.mdx` files to `src/content/`:

```mdx
# My Page Title

This is a documentation page with **Markdown** and React components!

<Card>
  <CardHeader>
    <CardTitle>Look, no imports!</CardTitle>
    <CardDescription>
      All shadcn/ui components work directly in MDX
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Button>Click me</Button>
  </CardContent>
</Card>
```

### 2. Configure Navigation

Update `src/content/_meta.json`:

```json
{
  "index": { "title": "Introduction", "type": "page" },
  "getting-started": { "title": "Getting Started", "type": "page" },
  "guides": { "title": "Guides", "type": "folder" },
  "---": { "type": "separator" },
  "github": { 
    "title": "GitHub", 
    "type": "link", 
    "href": "https://github.com/yourusername/yourrepo" 
  }
}
```

### 3. Use Components

All 28 shadcn/ui components are available:

```mdx
<Tabs defaultValue="npm">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
  </TabsList>
  <TabsContent value="npm">
    ```bash
    npm install package-name
    ```
  </TabsContent>
  <TabsContent value="pnpm">
    ```bash
    pnpm add package-name
    ```
  </TabsContent>
</Tabs>
```

## Available Components

All components from shadcn/ui are pre-configured:

- **Layout**: Card, Sheet, Separator, Collapsible
- **Navigation**: Tabs, Breadcrumb, Navigation Menu, Pagination
- **Forms**: Button, Input, Label, Select, Textarea, Checkbox, Switch
- **Data Display**: Table, Badge, Avatar, Skeleton
- **Feedback**: Alert, Toast (Sonner)
- **Overlays**: Dialog, Dropdown Menu, Popover, Tooltip, Hover Card
- **Utilities**: Command palette

See the [Component Reference](/components) and [Component Showcase](/components-showcase) for interactive examples.

## Customization

### Theme Colors

Edit `src/app.css` to customize colors:

```css
@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(3.95% 0.015 286.32);
  /* ... more color variables */
}
```

### Add Components

Add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add accordion
```

Then add to `src/mdx-components.tsx`:

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const mdxComponents = {
  // ... existing components
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
}
```

### Nextra Configuration

Modify `src/app/layout.tsx` to customize:
- Navigation bar
- Sidebar behavior
- Footer content
- Search functionality
- Theme switching

## Scripts

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm dlx shadcn@latest add <component>` - Add new components

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

### Other Platforms
```bash
# Build for production
pnpm run build

# Output is in .next directory
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Nextra 4](https://nextra.site/) - Documentation framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT

---

Built with ❤️ for documentation that developers actually want to write.