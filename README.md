# QA Case Study – MakeMyCV

Etude de cas QA réalisée dans le cadre d'un processus de recrutement pour un poste de QA Engineer.
L'application cible est **MakeMyCV** (makemycv.com), un outil web de création et téléchargement de CV en ligne.

---

## Organisation du repository

```
qa-case-study-makemycv/
├── README.md                          # Ce fichier
├── docs/
│   ├── 01-test-strategy.md            # Partie 1 : Cartographie, matrice de risques, plan de test, environnements
│   ├── 02-test-cases.md               # Partie 2 : 10 cas de test détaillés sur 3 parcours critiques
│   ├── 03-bug-reports.md              # Partie 3 : Rapport de bugs identifiés lors de l'exploration
│   ├── 04-automation.md               # Partie 4 : Approche d'automatisation, architecture, CI/CD
│   └── 05-recommendations.md         # Partie 5 : Recommandations UX, vision QA 3 mois, métriques
├── tests/
│   └── e2e/
│       ├── fixtures/
│       │   ├── user.json              # Données utilisateur de test
│       │   └── payment.json          # Cartes de test Stripe
│       ├── pages/
│       │   ├── HomePage.ts           # Page Object – landing page
│       │   ├── EditorPage.ts         # Page Object – éditeur de CV
│       │   └── CheckoutPage.ts       # Page Object – tunnel de paiement
│       └── specs/
│           └── cv-creation.spec.ts   # Scénario E2E happy path automatisé (TypeScript)
├── package.json
├── tsconfig.json
├── playwright.config.ts
└── .github/
    └── workflows/
        └── tests.yml                  # Pipeline CI/CD GitHub Actions
```

---

## Getting Started

### Prérequis

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/yassinus99/qa-case-study-makemycv.git
cd qa-case-study-makemycv
npm install
npx playwright install
```

### Exécuter les tests

```bash
# Smoke tests uniquement (parcours critiques, ~3 min)
npm test

# Suite de régression complète
npm run test:regression

# Tests mobile
npm run test:mobile

# Mode headed (navigateur visible, utile pour le debug)
npm run test:headed

# Ouvrir le rapport HTML après exécution
npm run test:report
```

---

## Synthèse

### Approche adoptée

Face à une application inconnue sans documentation, j'ai procédé en trois temps :

1. **Exploration fonctionnelle** du site makemycv.com pour cartographier les grandes fonctionnalités.
2. **Priorisation par risque** en croisant impact métier et probabilité de régression, pour concentrer l'effort de test là où une anomalie coûte le plus cher.
3. **Tests manuels structurés** couvrant le happy path, les edge cases, les validations et le responsive, puis documentation des anomalies trouvées.

### Conclusions principales

- Le parcours de création de CV (sélection template → saisie → prévisualisation → téléchargement) est le flux de valeur central et doit être couvert en priorité absolue par l'automatisation.
- Le modèle freemium (création gratuite, téléchargement payant) génère un risque élevé sur le tunnel de paiement : une régression à cet endroit a un impact direct sur le chiffre d'affaires.
- Plusieurs comportements identifiés lors de l'exploration méritent d'être clarifiés avec l'équipe : indication de gratuité peu explicite en amont du paiement, comportement de l'éditeur sur mobile, gestion de session après déconnexion intempestive.
- **Playwright avec TypeScript** a été retenu pour l'automatisation pour sa robustesse multi-navigateur, sa gestion native des SPA, ses types stricts et ses traces d'erreurs exploitables.
