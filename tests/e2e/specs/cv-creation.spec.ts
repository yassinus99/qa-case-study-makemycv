import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EditorPage } from '../pages/EditorPage';

import userData from '../fixtures/user.json';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Remplit un champ identifié par son label avec gestion de l'auto-wait.
 * Utilisé pour les champs dont le label exact peut varier selon la langue
 * de l'interface (EN/FR).
 */
async function fillField(page: Page, label: RegExp, value: string): Promise<void> {
  const field = page.getByLabel(label);
  await field.waitFor({ state: 'visible', timeout: 5_000 });
  await field.clear();
  await field.fill(value);
}

// ---------------------------------------------------------------------------
// Suite de tests
// ---------------------------------------------------------------------------

test.describe('Création de CV – Happy path', () => {

  /**
   * Parcours couvert :
   *   1.  Accéder à la landing page
   *   2.  Cliquer sur "Create my CV"
   *   3.  Sélectionner le template "Castor"
   *   4.  Remplir les informations personnelles
   *   5.  Ajouter une expérience professionnelle
   *   6.  Ajouter une formation
   *   7.  Vérifier que la prévisualisation reflète les données saisies
   *   8.  Vérifier que le bouton de téléchargement est visible et actif
   */
  test('@smoke doit permettre de créer un CV complet et d\'accéder au téléchargement', async ({ page }) => {
    const home   = new HomePage(page);
    const editor = new EditorPage(page);

    // ------------------------------------------------------------------
    // ETAPE 1 : Landing page
    // ------------------------------------------------------------------
    await home.goto();
    await expect(page).toHaveTitle(/makemycv/i);
    await expect(home.createCvCta).toBeVisible();

    // ------------------------------------------------------------------
    // ETAPE 2 : Accéder à l'éditeur
    // ------------------------------------------------------------------
    await home.clickCreateCV();
    await page.waitForURL(/\/create\/resume/, { timeout: 10_000 });

    // ------------------------------------------------------------------
    // ETAPE 3 : Sélectionner le template "Castor"
    // L'application peut présenter la galerie en premier step
    // ou charger directement l'éditeur avec un template par défaut.
    // ------------------------------------------------------------------
    const templateCard = page
      .getByRole('link', { name: /castor/i })
      .or(page.getByTestId('template-castor'))
      .first();

    if (await templateCard.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await templateCard.click();
      await page.waitForURL(/editor|create/, { timeout: 10_000 });
    }
    // Si la galerie n'apparaît pas, l'éditeur est déjà chargé avec un
    // template par défaut – on continue sans bloquer le test.

    // ------------------------------------------------------------------
    // ETAPE 4 : Informations personnelles
    // ------------------------------------------------------------------
    await fillField(page, /first name|prénom/i,        userData.firstName);
    await fillField(page, /last name|nom/i,             userData.lastName);
    await fillField(page, /job title|titre de poste/i,  userData.jobTitle);
    await fillField(page, /email/i,                     userData.email);
    await fillField(page, /phone|téléphone/i,           userData.phone);
    await fillField(page, /city|ville/i,                userData.city);

    // ------------------------------------------------------------------
    // ETAPE 5 : Ajouter une expérience professionnelle
    // ------------------------------------------------------------------
    await editor.addExperienceButton.click();

    // Les champs sont ajoutés dynamiquement – on cible le dernier rendu
    await page.getByLabel(/company|entreprise/i).last().fill(userData.experience.company);
    await page.getByLabel(/position|poste/i).last().fill(userData.experience.position);
    await page.getByLabel(/description/i).last().fill(userData.experience.description);

    // ------------------------------------------------------------------
    // ETAPE 6 : Ajouter une formation
    // ------------------------------------------------------------------
    await editor.addEducationButton.click();

    await page.getByLabel(/school|école|établissement/i).last().fill(userData.education.school);
    await page.getByLabel(/degree|diplôme/i).last().fill(userData.education.degree);

    // ------------------------------------------------------------------
    // ETAPE 7 : Vérifier la prévisualisation temps réel
    // ------------------------------------------------------------------
    const nameInFrame = editor.previewIframe.getByText(userData.lastName);
    const nameInPage  = page
      .locator('[data-testid="cv-preview"], [class*="preview"], [class*="Preview"]')
      .getByText(userData.lastName);

    await expect(nameInFrame.or(nameInPage)).toBeVisible({ timeout: 5_000 });

    // ------------------------------------------------------------------
    // ETAPE 8 : Le bouton de téléchargement est accessible
    // ------------------------------------------------------------------
    await expect(editor.downloadButton).toBeVisible();
    await expect(editor.downloadButton).toBeEnabled();
  });
});
