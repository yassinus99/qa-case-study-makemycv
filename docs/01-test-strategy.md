# Partie 1 – Plan d'action & Stratégie de test

## 1. Cartographie fonctionnelle

Après exploration du site makemycv.com, voici les grandes zones fonctionnelles identifiées.

### Landing page

- Présentation de l'outil.
- Galerie de templates de CV.
- Lien vers la création de CV et lettre de motivation.
- Actualités
- Lien vers "Mon compte".

### Compte

- Inscription.
- Connexion.
- Gestion de compte.
- Récupération de mot de passe.

### Création de CV 

- Sélection du template.
- Assistance IA pour suggérer du contenu.
- Import d'un CV existant.
- Prévisualisation temps réel du rendu.

### Téléchargement

- Téléchargement en PDF
- Paiement

### Lettre de motivation

- Sélection d'un template de lettre
- Éditeur de lettre
- Téléchargement PDF de la lettre

### Contenu éditorial

- Pages de conseils
- Exemples de CV
- guides

---

## 2. Matrice de risques

La criticité est calculée par le produit : **Impact métier (1-5) × Probabilité de bug (1-5)**

| Fonctionnalité | Impact métier | Probabilité bug | Score | Niveau de risque |
|---|---|---|---|---|
| Téléchargement PDF et tunnel paiement | 5 | 4 | 20 | Critique |
| Création de CV  et sauvegarde des données | 5 | 4 | 20 | Critique |
| Import d'un CV existant  | 4 | 5 | 20 | Critique |
| prévisualisation temps réel | 4 | 4 | 16 | Elevé |
| Sélection de template | 4 | 3 | 12 | Elevé |
| Assistance IA  | 3 | 4 | 12 | Elevé |
| Personnalisation couleur / design | 3 | 3 | 9 | Modéré |
| Authentification | 4 | 2 | 8 | Modéré |
| Création lettre de motivation | 3 | 3 | 9 | Modéré |
| Pages éditoriales | 1 | 2 | 2 | Faible |

**Justification des scores élevés :**

Le tunnel de téléchargement/paiement et la sauvegarde des données de l'éditeur reçoivent un score maximum car une régression sur ces deux points impacte directement le revenu et la satisfaction client. L'import de CV score également très haut car le parsing de documents tiers peut être une source de bugs fréquents.

---

## 3. Plan de test priorisé

### Priorité 1 – Bloquant à tester avant chaque déploiement

Ces parcours correspondent aux flux à forte valeur métier.

- **P1-A** : Création d'un CV from scratch jusqu'au téléchargement PDF
- **P1-B** : Tunnel de paiement jusqu'à la réception du PDF
- **P1-C** : Import d'un CV existant → édition → téléchargement

### Priorité 2 – Potentiel risque de régression  

- **P2-A** : Inscription / connexion utilisateur
- **P2-B** : Changement de template en temps réel
- **P2-C** : Assistance IA 
- **P2-D** : Création d'une lettre de motivation

### Priorité 3 – Confort et qualité de l'expérience utilisateur

- **P3-A** : Personnalisation CV (couleurs, langue)
- **P3-B** : Responsiveness
- **P3-C** : Pages de contenu éditorial

**Justification de la priorisation :**

Compte tenu de la fenêtre de deployment , les tests P1 doivent  être automatisés et exécutables le plus rapidement possible pour permettre un rollback rapide en cas de régression.

---

## 4. Stratégie d'environnement

### Navigateurs desktop

| Navigateur | Version | Justification |
|---|---|---|
| Chrome | Dernière stable | Part de marché importante |
| Firefox | Dernière stable | Second navigateur le plus utilisé |
| Safari | Dernière stable  | Important pour les utilisateurs Apple |
| Edge | Dernière stable | Présent en entreprise |

Chrome est le navigateur de référence. Firefox et Safari pour couvrir un large panel d'utilisateur. Edge est un bonus.

### Devices mobiles

| Device | OS | Résolution | Justification |
|---|---|---|---|
| iPhone 14 / 15 | iOS 17 | 390x844 | Représente ~25% du trafic mobile mondial |
| Samsung Galaxy S23 | Android 13 | 393x851 | Référence Android |
| iPad  | iPadOS 16 | 820x1180 | Tablette car lecture recruteurs en forte croissance |

### Résolutions desktop à couvrir

| Résolution | Justification |
|---|---|
| 1920x1080 | Full HD – la plus répandue en bureau |
| 1440x900 | MacBook 13" – profil utilisateur probable |
| 1280x800 | Valeur limite basse pour les laptops anciens |
| 375x667 | iPhone SE – cas limite mobile bas de gamme |

### Justification globale

L'application cible des personnes en recherche d'emploi, avec une probabilité élevée d'usage mobile car le site mentionne sa compatibilité mobile. Les navigateurs retenus couvrent >95% des parts de marché. Safari est incontournable car ses comportements CSS diffèrent fréquemment de Chrome.
