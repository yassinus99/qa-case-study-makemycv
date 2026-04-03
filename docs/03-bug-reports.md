# Partie 3 – Rapport de bugs

Les anomalies ci-dessous ont été identifiées lors de l'exploration du site makemycv.com.

---

### BUG-001

| Champ | Détail |
|---|---|
| **ID** | BUG-001 |
| **Titre** | Absence d'indication claire du modèle payant avant le début de la création du CV |
| **Sévérité** | Majeur |
| **Etapes de reproduction** | 1. Se rendre sur makemycv.com. 2. Cliquer sur "Create my CV". 3. Remplir un CV complet. 4. Cliquer sur "Download". |
| **Résultat attendu** | Le caractère payant du téléchargement est clairement indiqué sur la landing page ou en début de parcours, avant que l'utilisateur investisse du temps. |
| **Résultat obtenu** | Le prix n'est révélé qu'au moment du téléchargement. |
| **Environnement** | Chrome, Windows 11, 1920x1080 |
| **Capture d'écran** | N/A|

---

### BUG-002


| Champ | Détail |
|---|---|
| **ID** | BUG-002 |
| **Titre** | Risque de débit non souhaité suite à l'oubli d'annulation d'abonnement |
| **Sévérité** | Critique |
| **Etapes de reproduction** | 1. Souscrire à un abonnement pour télécharger un CV. 2. Ne pas annuler l'abonnement dans les délais. 3. Observer le débit automatique à la période suivante. |
| **Résultat attendu** | L'utilisateur est clairement informé (email de rappel, affichage en dashboard) de la date de prochain renouvellement avant qu'il ait lieu. |
| **Résultat obtenu** | Absence de notification de rappel et une date d'échéance insuffisamment visible. |
| **Environnement** | Comportement métier |
| **Capture d'écran** | N/A |

---
