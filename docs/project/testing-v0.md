# Testing Implementation Plan v0

## Executive Summary

This document outlines a comprehensive testing strategy for the Docs Starter Kit project, incorporating Vitest for unit/integration testing and Playwright for end-to-end testing. The plan ensures robust test coverage while maintaining developer productivity and documentation site reliability.

## Project Overview

The Docs Starter Kit is a Next.js 15 application using:
- App Router architecture
- Nextra 4 for MDX-powered documentation
- Tailwind CSS v4 with PostCSS
- shadcn/ui component library (28 components)
- TypeScript with strict mode

## Testing Architecture

### 1. Unit Testing (Vitest)

#### Scope
- Individual components in isolation
- Utility functions
- Custom hooks
- MDX component mappings
- Route handlers

#### Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

#### Test Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx
│   └── __tests__/
│       └── component-integration.test.tsx
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── test/
    ├── setup.ts
    ├── mocks/
    └── fixtures/
```

### 2. Integration Testing (Vitest + Testing Library)

#### Scope
- Component interactions
- MDX content rendering
- Navigation behavior
- Theme switching
- Search functionality

#### Key Areas
1. **MDX Integration**
   - Component rendering in MDX
   - Code syntax highlighting
   - Dynamic imports
   - Meta file processing

2. **Navigation Testing**
   - Sidebar generation
   - Breadcrumb accuracy
   - Page transitions
   - Active state management

3. **Theme Integration**
   - Dark mode switching
   - CSS variable updates
   - Component theme adaptation

### 3. End-to-End Testing (Playwright)

#### Scope
- Complete user journeys
- Cross-browser compatibility
- Mobile responsiveness
- Performance metrics
- Accessibility compliance

#### Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
})
```

#### Test Scenarios
1. **Documentation Navigation**
   - Navigate through all documentation sections
   - Verify sidebar state persistence
   - Test search functionality
   - Validate breadcrumb navigation

2. **Component Showcase**
   - Interact with all 28 shadcn/ui components
   - Verify component states and behaviors
   - Test keyboard navigation
   - Validate ARIA attributes

3. **Content Features**
   - Code copying functionality
   - Tab navigation in code blocks
   - Link validation
   - Image loading and optimization

4. **Performance Testing**
   - Page load times < 3s
   - First Contentful Paint < 1.5s
   - Time to Interactive < 3.5s
   - Cumulative Layout Shift < 0.1

## Implementation Timeline

### Phase 1: Foundation (Week 1-2)

#### Week 1
- [ ] Install and configure Vitest
- [ ] Set up test utilities and helpers
- [ ] Create test fixtures for MDX content
- [ ] Write initial unit tests for lib/utils.ts

#### Week 2
- [ ] Install and configure Playwright
- [ ] Create E2E test structure
- [ ] Set up CI pipeline for test execution
- [ ] Write smoke tests for critical paths

### Phase 2: Component Testing (Week 3-4)

#### Week 3
- [ ] Unit tests for 14 shadcn/ui components (priority: high-usage)
  - Button, Card, Dialog, Dropdown Menu
  - Input, Select, Tabs, Navigation Menu
  - Alert, Badge, Command, Popover
  - Sheet, Tooltip

#### Week 4
- [ ] Unit tests for remaining 14 components
- [ ] Integration tests for component combinations
- [ ] MDX component rendering tests
- [ ] Theme switching tests

### Phase 3: E2E Coverage (Week 5-6)

#### Week 5
- [ ] Navigation flow tests
- [ ] Search functionality tests
- [ ] Mobile responsiveness tests
- [ ] Cross-browser compatibility tests

#### Week 6
- [ ] Performance benchmarking
- [ ] Accessibility audit tests
- [ ] Error boundary testing
- [ ] 404 page handling

### Phase 4: Optimization (Week 7-8)

#### Week 7
- [ ] Test optimization and parallelization
- [ ] Coverage gap analysis
- [ ] Documentation for test patterns
- [ ] Visual regression testing setup

#### Week 8
- [ ] CI/CD pipeline optimization
- [ ] Test reporting dashboards
- [ ] Performance monitoring integration
- [ ] Final test suite review

## Test Coverage Goals

### Unit Test Coverage
- **Target**: 80% overall coverage
- **Critical paths**: 95% coverage
- Components: 90%
- Utilities: 100%
- Hooks: 95%

### E2E Test Coverage
- All user journeys: 100%
- Component interactions: 90%
- Error scenarios: 80%
- Edge cases: 70%

## Best Practices

### 1. Test Writing Guidelines
```typescript
// Good test example
describe('Button Component', () => {
  it('should render with correct variant styles', () => {
    const { container } = render(
      <Button variant="destructive">Delete</Button>
    )
    expect(container.firstChild).toHaveClass('bg-destructive')
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>
    )
    
    await userEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 2. E2E Test Patterns
```typescript
// Page Object Model
class ComponentShowcasePage {
  constructor(private page: Page) {}

  async navigateToComponent(name: string) {
    await this.page.getByRole('link', { name }).click()
    await this.page.waitForLoadState('networkidle')
  }

  async interactWithExample(index: number) {
    const example = this.page.locator('[data-example]').nth(index)
    return example
  }
}
```

### 3. Test Data Management
- Use factories for complex test data
- Maintain fixtures for MDX content
- Mock external dependencies
- Use deterministic data for snapshots

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:unit
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm playwright install --with-deps ${{ matrix.browser }}
      - run: pnpm test:e2e:${{ matrix.browser }}
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
```

## Monitoring and Reporting

### 1. Test Dashboards
- Vitest UI for local development
- Playwright HTML reports
- Coverage trends in CI
- Performance regression alerts

### 2. Metrics to Track
- Test execution time
- Flaky test frequency
- Coverage percentages
- Performance benchmarks

### 3. Alert Thresholds
- Coverage drop > 5%
- Test duration increase > 20%
- Flaky test rate > 2%
- Performance regression > 10%

## Risk Mitigation

### Identified Risks
1. **Test Maintenance Burden**
   - Mitigation: Use Page Object Model
   - Maintain clear test documentation
   - Regular test review cycles

2. **Flaky Tests**
   - Mitigation: Proper wait strategies
   - Deterministic test data
   - Isolated test environments

3. **Performance Impact**
   - Mitigation: Parallel execution
   - Smart test selection
   - Caching strategies

## Success Criteria

### Immediate (Month 1)
- [ ] 50% unit test coverage achieved
- [ ] Critical user paths covered by E2E
- [ ] CI pipeline executing all tests
- [ ] Zero flaky tests

### Short-term (Month 3)
- [ ] 80% unit test coverage
- [ ] All components fully tested
- [ ] Visual regression testing active
- [ ] Sub-5 minute CI execution

### Long-term (Month 6)
- [ ] 90%+ coverage maintained
- [ ] Automated performance tracking
- [ ] Test-driven development adopted
- [ ] Zero production regressions

## Appendix: Tool Versions

```json
{
  "devDependencies": {
    "@playwright/test": "^1.48.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "vitest": "^2.1.0",
    "@vitest/coverage-v8": "^2.1.0",
    "@vitest/ui": "^2.1.0"
  }
}
```

## Next Steps

1. Review and approve this plan
2. Create feature branch: `feature/testing-infrastructure`
3. Begin Phase 1 implementation
4. Set up weekly testing sync meetings
5. Establish test writing guidelines workshop

---

*Document Version: 0.1.0*  
*Last Updated: [Current Date]*  
*Status: Draft - Pending Review*