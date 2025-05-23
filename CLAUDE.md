# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Docs Starter Kit** - a production-ready documentation template that combines:
- **Next.js 15** with App Router for modern React applications
- **Nextra 4** for MDX-powered documentation with automatic navigation
- **Tailwind CSS v4** using the new PostCSS-only approach  
- **shadcn/ui** components (New York theme, Stone colors) - all 28 components pre-configured

## Commands

### Development
```bash
pnpm run dev    # Start development server with Turbopack on port 3000+
pnpm run build  # Build for production
pnpm run start  # Start production server
```

### Adding Components
```bash
pnpm dlx shadcn@latest add <component>  # Add new shadcn/ui components
```

## Project Structure

```
docs-starter-kit/
├── src/                      # All source code (keeps root clean)
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout with Nextra theme config
│   │   └── [[...slug]]/      # Dynamic catch-all route
│   │       └── page.tsx      # Renders MDX content
│   ├── components/           # React components
│   │   └── ui/              # 28 shadcn/ui components
│   ├── content/             # Documentation content (MDX)
│   │   ├── _meta.json       # Navigation structure
│   │   ├── index.mdx        # Homepage
│   │   ├── getting-started.mdx
│   │   ├── components.mdx   # Component reference
│   │   ├── components-showcase.mdx
│   │   ├── examples.mdx
│   │   └── guides/          # Guide pages
│   │       ├── _meta.json
│   │       ├── writing-content.mdx
│   │       ├── organizing-pages.mdx
│   │       └── deployment.mdx
│   ├── lib/                 # Utilities
│   │   └── utils.ts         # cn() for className merging
│   ├── app.css             # Global styles + Tailwind v4
│   └── mdx-components.tsx   # MDX component mappings
├── next.config.mjs          # Next.js + Nextra config
├── postcss.config.mjs       # PostCSS for Tailwind v4
├── tsconfig.json           # TypeScript config
├── components.json         # shadcn/ui config
└── package.json

```

## Key Implementation Details

### 1. App Router + Nextra 4
- Uses Next.js 15 App Router (NOT pages directory)
- Dynamic catch-all route `[[...slug]]` handles all documentation pages
- Nextra 4 configured with `contentDirBasePath: '/src/content'`

### 2. MDX Components
All shadcn/ui components are pre-mapped in `src/mdx-components.tsx`:
- No imports needed in MDX files
- Components available: Button, Card, Alert, Badge, Tabs, Dialog, etc.
- Custom HTML element overrides for consistent styling

### 3. Navigation Structure
Controlled by `_meta.json` files:
```json
{
  "index": { "title": "Introduction", "type": "page" },
  "getting-started": { "title": "Getting Started", "type": "page" },
  "guides": { "title": "Guides", "type": "folder" },
  "---": { "type": "separator" },
  "github": { "title": "GitHub", "type": "link", "href": "https://github.com/..." }
}
```

### 4. Styling System
- **Tailwind CSS v4** with PostCSS-only setup
- **OKLCH color system** for modern color management
- **CSS variables** for shadcn/ui theming
- **Dark mode** with custom variant: `@custom-variant dark (&:is(.dark *))`

## Common Tasks

### Adding a New Page
1. Create `.mdx` file in `src/content/`
2. Update `_meta.json` to include in navigation
3. Use any shadcn/ui component without imports

### Creating a New Section
1. Create folder in `src/content/`
2. Add `_meta.json` in the folder
3. Add `.mdx` files for each page

### Using Components in MDX
```mdx
<Card>
  <CardHeader>
    <CardTitle>No imports needed!</CardTitle>
  </CardHeader>
  <CardContent>
    All components are pre-configured.
  </CardContent>
</Card>
```

### Customizing Theme
- Edit `src/app.css` for global styles
- Modify CSS variables for colors
- Update `components.json` for shadcn/ui defaults

## Best Practices

1. **File Organization**: Keep all source in `src/` directory
2. **Component Usage**: Leverage pre-configured shadcn/ui components
3. **Navigation**: Use `_meta.json` for automatic navigation generation
4. **MDX Features**: Combine Markdown with React components freely
5. **Performance**: Nextra handles code splitting and optimization

## Troubleshooting

### Port Already in Use
Dev server will auto-increment ports (3000 → 3001 → 3002)

### TypeScript Errors
- Path alias is `@/*` → `./src/*`
- All shadcn/ui components have proper types

### Component Not Working
- Check `src/mdx-components.tsx` for proper export
- Ensure component is installed via shadcn CLI

## Notes
- React 19 + Next.js 15 (latest versions)
- No testing/linting setup - add as needed
- Production-ready with `pnpm run build`