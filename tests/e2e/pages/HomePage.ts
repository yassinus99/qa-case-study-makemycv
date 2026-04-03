import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly createCvCta: Locator;
  readonly importCvCta: Locator;
  readonly myAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createCvCta = page.getByRole('link', { name: /create my cv/i });
    this.importCvCta = page.getByRole('link', { name: /import my cv/i });
    this.myAccountLink = page.getByRole('link', { name: /my account/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateCV(): Promise<void> {
    await this.createCvCta.click();
  }

  async clickImportCV(): Promise<void> {
    await this.importCvCta.click();
  }
}
