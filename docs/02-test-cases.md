# Partie 2 – Cas de test détaillés

Les trois parcours critiques couverts :

- **Parcours A** : Création de CV from scratch (happy path + edge cases + erreurs)
- **Parcours B** : Téléchargement PDF (modèle freemium / tunnel de paiement)
- **Parcours C** : Responsive mobile

---

## Parcours A – Création de CV from scratch

---

### TC-001

| Champ | Détail |
|---|---|
| **ID** | TC-001 |
| **Titre** | Création d'un CV complet en partant de zéro – Happy path |
| **Préconditions** | Utilisateur non connecté. Navigateur Chrome dernière version. Résolution 1920x1080. |
| **Etapes** | 1. Accéder à makemycv.com. 2. Cliquer sur "Create my CV". 3. Sélectionner le template. 4. Remplir la section "Informations personnelles". 5. Ajouter une expérience professionnelle. 6. Ajouter une formation. 7. Ajouter les compétences. 8. Ajouter les langues. 9. Vérifier la prévisualisation en temps réel. 10. Vérifier l'accessibilité du bouton de téléchargement. |
| **Résultat attendu** | Chaque section saisie se reflète immédiatement dans la prévisualisation. Le bouton de téléchargement est visible et actif. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Critique |

---

### TC-002

| Champ | Détail |
|---|---|
| **ID** | TC-002 |
| **Titre** | Tentative de création d'un CV avec tous les champs obligatoires vides |
| **Préconditions** | Utilisateur sur l'éditeur. Aucun champ rempli. |
| **Etapes** | 1. Accéder à l'éditeur de CV. 2. Ne remplir aucun champ. 3. Tenter de passer à l'étape suivante ou de télécharger le CV. |
| **Résultat attendu** | Un message de validation explicite informe l'utilisateur que les champs obligatoires doivent être remplis. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

### TC-003

| Champ | Détail |
|---|---|
| **ID** | TC-003 |
| **Titre** | Saisie d'un email avec un format invalide dans les informations personnelles |
| **Préconditions** | Utilisateur sur l'éditeur, section "Informations personnelles". |
| **Etapes** | 1. Remplir le champ "Prénom" avec "Jean". 2. Remplir le champ "Nom" avec "Dupont". 3. Saisir un fromat dans le champ email (jean.dupont@@gmail). 4. Passer au champ suivant. |
| **Résultat attendu** | Un message d'erreur de validation s'affiche sous le champ email indiquant un format invalide. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

### TC-004

| Champ | Détail |
|---|---|
| **ID** | TC-004 |
| **Titre** | Saisie d'un contenu très long dans le champ "Description" d'une expérience |
| **Préconditions** | Utilisateur sur l'éditeur, section "Expériences professionnelles". |
| **Etapes** | 1. Cliquer sur "Ajouter une expérience". 2. Remplir les champs titre, entreprise, dates. 3. Dans le champ description, coller un texte très long (+2000 caractères). 4. Observer la prévisualisation du CV. |
| **Résultat attendu** | Le CV s'étend sur 2 pages avec indication claire. La mise en page n'est pas cassée dans la prévisualisation. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

### TC-005

| Champ | Détail |
|---|---|
| **ID** | TC-005 |
| **Titre** | Changement de template en cours d'édition |
| **Préconditions** | Utilisateur ayant rempli un CV complet avec un template. |
| **Etapes** | 1. Depuis l'éditeur, accéder à la galerie de templates. 2. Sélectionner un autre template. 3. Confirmer le changement si une modale s'affiche. 4. Vérifier que toutes les données saisies sont toujours présentes dans le nouveau template. |
| **Résultat attendu** | Toutes les données précédemment saisies sont conservées et affichées dans le nouveau template. Seul le rendu visuel change. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Critique |

---

### TC-006

| Champ | Détail |
|---|---|
| **ID** | TC-006 |
| **Titre** | Utilisation de l'assistance IA pour générer une description d'expérience |
| **Préconditions** | Utilisateur sur l'éditeur, section "Expériences". |
| **Etapes** | 1. Ajouter une expérience et remplir le titre de poste. 2. Cliquer sur le bouton d'assistance IA dans le champ description. 3. Observer la génération de contenu. 4. Sélectionner une suggestion générée. 5. Vérifier que le texte est bien inséré dans le champ. |
| **Résultat attendu** | L'IA génère du contenu pertinent par rapport au titre de poste saisi. Le texte généré peut être inséré dans le champ avec un clic. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

## Parcours B – Téléchargement PDF

---

### TC-007

| Champ | Détail |
|---|---|
| **ID** | TC-007 |
| **Titre** | Téléchargement du CV en PDF après paiement – Happy path |
| **Préconditions** | Utilisateur avec un CV complet créé. Carte de test disponible. |
| **Etapes** | 1. Depuis l'éditeur, cliquer sur "Download". 2. Observer la page de paiement. 3. Saisir les informations de carte de test valides. 4. Valider le paiement. 5. Observer la redirection ou le téléchargement automatique. 6. Ouvrir le fichier PDF téléchargé. |
| **Résultat attendu** | Le paiement est accepté. Un fichier PDF est téléchargé. Le PDF contient toutes les données saisies et correspond visuellement à la prévisualisation.|
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Critique |

---

### TC-008

| Champ | Détail |
|---|---|
| **ID** | TC-008 |
| **Titre** | Tentative de téléchargement avec une carte bancaire refusée |
| **Préconditions** | Utilisateur avec un CV créé. Carte de test refusée Stripe. |
| **Etapes** | 1. Cliquer sur "Download". 2. Accéder à la page de paiement. 3. Saisir les informations de la carte qui sera refusée. 4. Valider le paiement. |
| **Résultat attendu** | Un message d'erreur explicite indique que le paiement a été refusé. L'utilisateur reste sur la page de paiement avec la possibilité de réessayer. Le CV n'est pas téléchargé. Aucune somme n'est débitée. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Critique |

---

### TC-009

| Champ | Détail |
|---|---|
| **ID** | TC-009 |
| **Titre** | Vérification de la transparence tarifaire avant d'atteindre le tunnel de paiement |
| **Préconditions** | Utilisateur non connecté, en début de parcours de création. |
| **Etapes** | 1. Depuis la landing page, cliquer sur "Create my CV". 2. Naviguer dans l'éditeur. 3. Après avoir rempli le CV, tenter de le télécharger. 4. Observer à quel moment le prix est clairement communiqué. |
| **Résultat attendu** | Le prix du téléchargement est affiché de manière visible avant que l'utilisateur ait investi du temps significatif. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

## Parcours C – Responsive mobile

---

### TC-010

| Champ | Détail |
|---|---|
| **ID** | TC-010 |
| **Titre** | Création d'un CV depuis un smartphone – Vérification de l'ergonomie de l'éditeur |
| **Préconditions** | Appareil mobile (ex: iPhone 14) avec Safari iOS ou Chrome mobile. |
| **Etapes** | 1. Accéder à makemycv.com depuis le navigateur mobile. 2. Cliquer sur "Create my CV". 3. Sélectionner un template. 4. Remplir les champs "Prénom", "Nom", "Email". 5.Naviguer entre les sections. 6. Vérifier que la prévisualisation est accessible. 7. Accéder au bouton "Download". |
| **Résultat attendu** | L'interface est entièrement utilisable sur mobile. Les champs et la prévisualisation sont accessibles. Aucun scroll horizontal ne trahit un layout cassé. |
| **Résultat obtenu** | A compléter lors de l'exécution |
| **Statut** | A investiguer |
| **Sévérité** | Majeur |

---

