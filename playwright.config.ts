import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e/specs',

  // Exécution parallèle des tests
  fullyParallel: true,

  // Interdire test.only en CI pour éviter les oublis
  forbidOnly: !!process.env.CI,

  // 2 tentatives en CI pour absorber les flaky tests liés au réseau
  retries: process.env.CI ? 2 : 0,

  // 4 workers en CI, automatique en local
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ...(process.env.CI ? ([['github']] as const) : []),
  ],

  use: {
    // URL de base – surchargée par la variable d'environnement BASE_URL en CI
    baseURL: process.env.BASE_URL ?? 'https://makemycv.com',

    // Traces et captures uniquement en cas d'échec pour limiter le bruit
    trace:      'on-first-retry',
    screenshot: 'only-on-failure',
    video:      'on-first-retry',

    // Timeouts
    actionTimeout:     10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    // -- Desktop --
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grep: /@regression/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@regression/,
    },

    // -- Mobile --
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      grep: /@mobile/,
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
      grep: /@mobile/,
    },
  ],

  outputDir: 'test-results/',
});
