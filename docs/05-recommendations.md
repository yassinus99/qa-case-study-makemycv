# Partie 5 – Recommandations & Vision QA

## 1. Recommandations UX basées sur l'exploration

###  Afficher le modèle tarifaire dès le début du parcours de création

La découverte du paiement après 30 minutes de travail peut créer une friction majeure qui nuit à la confiance utilisateur.

Recommandation : afficher un bandeau dès la landing page et dans l'en-tête de l'éditeur avec le modèle tarifaire.

### Proposer un mode d'édition libre sans interférence de l'IA

L'IA est un atout mais qui peut être intrusive. Les utilisateurs qui savent ce qu'ils veulent écrire peuvent être ralentis et frustrés.

Recommandation concrète : ajouter un toggle "AI suggestions ON/OFF" bien visible dans l'éditeur.

###  Améliorer la visibilité de la date de renouvellement d'abonnement

Les utilisateurs peuvent être débités sans s'y attendre, ce qui génère des demandes de remboursement et détériore la relation client.

Recommandation concrète : envoyer un email de rappel 3 jours avant le renouvellement automatique, et afficher la date de prochain débit clairement dans le dashboard utilisateur.

---

## 2. Vision QA idéale à 3 mois

- Participation aux sprint plannings pour identifier les risques en amont.
- Couverture automatisée des parcours critiques avec  intégration dans la CI/CD pour bloquer le merge si les  tests échouent. 
- Mise en place d'un processus de bug reporting dans Jira.
- Elargir la couverture aux autres tests moins critiques mais tout aussi importants.
- Mise en place des Tests API.
- Mise en place des Tests de charge sur les endpoints critiques.

---

## 3. Métriques de qualité à mettre en place

- Taux de couverture des parcours critiques automatisés.
- Taux de couverture des cas de test manuels documentés.
- Durée d'exécution des tests.
- Taux de régression.
- Densité de bugs par feature.
- Taux de flakiness.
