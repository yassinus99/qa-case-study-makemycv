import { Page, Locator, FrameLocator } from '@playwright/test';

interface PersonalInfo {
  firstName: string;
  lastName:  string;
  jobTitle:  string;
  email:     string;
  phone:     string;
  city:      string;
}

interface Experience {
  company:     string;
  position:    string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
}

export class EditorPage {
  readonly page: Page;

  // Informations personnelles
  readonly firstNameInput: Locator;
  readonly lastNameInput:  Locator;
  readonly jobTitleInput:  Locator;
  readonly emailInput:     Locator;
  readonly phoneInput:     Locator;
  readonly cityInput:      Locator;

  // Actions
  readonly addExperienceButton: Locator;
  readonly addEducationButton:  Locator;
  readonly downloadButton:      Locator;

  // Prévisualisation
  readonly previewIframe: FrameLocator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByLabel(/first name|prénom/i);
    this.lastNameInput  = page.getByLabel(/last name|nom/i);
    this.jobTitleInput  = page.getByLabel(/job title|titre de poste/i);
    this.emailInput     = page.getByLabel(/email/i);
    this.phoneInput     = page.getByLabel(/phone|téléphone/i);
    this.cityInput      = page.getByLabel(/city|ville/i);

    this.addExperienceButton = page.getByRole('button', { name: /add experience|ajouter.*expérience/i }).first();
    this.addEducationButton  = page.getByRole('button', { name: /add education|ajouter.*formation/i }).first();
    this.downloadButton      = page.getByRole('button', { name: /download|télécharger/i });

    this.previewIframe = page.frameLocator(
      'iframe[title*="preview"], iframe[data-testid="preview"]'
    );
  }

  private async safeFill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 5_000 });
    await locator.clear();
    await locator.fill(value);
  }

  async fillPersonalInfo(data: PersonalInfo): Promise<void> {
    await this.safeFill(this.firstNameInput, data.firstName);
    await this.safeFill(this.lastNameInput,  data.lastName);
    await this.safeFill(this.jobTitleInput,  data.jobTitle);
    await this.safeFill(this.emailInput,     data.email);
    await this.safeFill(this.phoneInput,     data.phone);
    await this.safeFill(this.cityInput,      data.city);
  }

  async addExperience(data: Experience): Promise<void> {
    await this.addExperienceButton.click();
    await this.page.getByLabel(/company|entreprise/i).last().fill(data.company);
    await this.page.getByLabel(/position|poste/i).last().fill(data.position);
    await this.page.getByLabel(/description/i).last().fill(data.description);
  }

  async addEducation(data: Education): Promise<void> {
    await this.addEducationButton.click();
    await this.page.getByLabel(/school|école|établissement/i).last().fill(data.school);
    await this.page.getByLabel(/degree|diplôme/i).last().fill(data.degree);
  }

  async selectTemplate(templateName: string): Promise<void> {
    const btn = this.page
      .getByRole('link', { name: new RegExp(templateName, 'i') })
      .first();
    await btn.click();

    // Confirmer si une modale de confirmation s'affiche
    const confirmBtn = this.page.getByRole('button', { name: /confirm|continuer|ok/i });
    if (await confirmBtn.isVisible({ timeout: 1_500 }).catch(() => false)) {
      await confirmBtn.click();
    }
  }
}
