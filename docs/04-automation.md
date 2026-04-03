# Partie 4 – Approche d'automatisation

## 1. Choix du framework : Playwright + TypeScript

### Outil retenu

**Playwright** (Microsoft, open source) avec **TypeScript**.

### Justification

| Critère | Playwright | Cypress | Selenium |
|---|---|---|---|
| Multi-navigateur natif | Chrome, Firefox, Safari, Edge | Chrome, Firefox, Edge (pas Safari réel) | Tous mais config complexe |
| Vitesse d'exécution | Très rapide (parallélisme natif) | Rapide | Plus lent |
| Support mobile (émulation) | Natif, précis (DeviceDescriptors) | Limité | Via Appium (complexe) |
| Gestion des SPA / async | Excellent (auto-wait) | Bon | Manuel |
| Debuggabilité | Traces vidéo + réseau + screenshots auto | Dashboard interactif | Logs basiques |
| TypeScript | Support natif first-class | Support via plugin | Support limité |
| Intégration CI/CD | Très simple (image Docker officielle) | Simple | Complexe |

Playwright est le choix le plus adapté ici pour trois raisons principales :

Premièrement, MakeMyCV est une SPA (Next.js), et Playwright gère nativement l'attente des éléments sans nécessiter de `wait` explicites fragiles.

Deuxièmement, la couverture Safari est critique pour cette application et seul Playwright permet de tester sur le vrai moteur WebKit.

Troisièmement, **TypeScript** apporte la détection d'erreurs à la compilation, l'autocomplétion dans l'IDE, et une meilleure maintenabilité sur le long terme – c'est le standard de l'industrie pour les projets de test E2E sérieux.

---

## 2. Architecture du projet de tests

```
tests/
├── e2e/
│   ├── fixtures/
│   │   ├── user.json           # Données utilisateur de test
│   │   └── payment.json        # Cartes de test Stripe
│   ├── pages/
│   │   ├── HomePage.ts         # Page Object – landing page
│   │   ├── EditorPage.ts       # Page Object – éditeur CV
│   │   └── CheckoutPage.ts     # Page Object – tunnel de paiement
│   └── specs/
│       └── cv-creation.spec.ts # Happy path automatisé (TypeScript)
├── playwright.config.ts        # Configuration globale
└── tsconfig.json               # Configuration TypeScript
```

### Principes d'architecture

**Page Object Model (POM)** : chaque page est modélisée par une classe TypeScript exposant des méthodes de haut niveau. Les sélecteurs ne sont jamais dupliqués dans les specs.

**Fixtures de données externalisées** : les jeux de données (user, cartes de test) sont en JSON, modifiables sans toucher au code.

**Sélecteurs sémantiques** : on utilise exclusivement `getByRole`, `getByLabel`, `getByText`. Ils reflètent ce qu'un utilisateur perçoit et résistent aux refactorisations CSS.

**Aucun `waitForTimeout` hardcodé** : tous les délais sont conditionnels via les mécanismes d'auto-wait de Playwright.

**Taggage des tests** : `@smoke`, `@regression`, `@mobile` pour cibler l'exécution selon le contexte (push, merge, canary).

---

## 3. Le script automatisé

Le script se trouve dans `tests/e2e/specs/cv-creation.spec.ts`.

Il couvre le happy path TC-001 : création d'un CV complet depuis la landing page jusqu'à l'accessibilité du bouton de téléchargement.

Voir le fichier directement pour le code complet et commenté.

---

## 4. Stratégie CI/CD

### Pipeline GitHub Actions (`.github/workflows/tests.yml`)

Trois jobs distincts selon la portée :

- **smoke-tests** : lancé à chaque push et chaque PR. Ne tourne que sur Chromium. Doit passer en moins de 8 minutes. Bloque le merge si il échoue.
- **regression-tests** : lancé sur merge vers `main`. Tourne sur Chromium + Firefox + WebKit. Durée cible < 25 minutes.
- **mobile-tests** : lancé sur merge vers `main`. Tourne sur les presets iPhone 14 et Pixel 7.

### Intégration avec le déploiement canary

Compte tenu de la fenêtre de 3h à <20% de trafic :

1. Déploiement canary lancé à 9h00
2. Smoke tests déclenchés automatiquement sur l'environnement canary à 9h05
3. Si les smoke tests passent : rollout progressif autorisé
4. Si un smoke test échoue : alerte Slack immédiate + rollback manuel ou automatisé
5. Tests de régression complets en arrière-plan pendant la fenêtre canary

### Variables d'environnement requises

| Variable | Description |
|---|---|
| `BASE_URL` | URL de l'environnement de test (staging ou canary) |
| `SLACK_WEBHOOK` | Webhook pour les notifications d'échec |
