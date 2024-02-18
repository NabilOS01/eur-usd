# Roadmap

## UI

L'interface utilisateur fournie est très basique, vu que l'accent est plutôt mis sur la partie UX. Cependant un vrai projet nécessitera un UI moderne et esthétique. Certaines librairies peuvent être utilisées pour celà, tel que angular-material, tailwind, ainsi que le design d'un prototype avec Figma (ou un autre outil).

## Taux de change réél

La façon dont le taux de change est calculé n'est pas utilisable en production. Une meilleur façon serait d'intérroger une API afin de chercher le vrai taux de change.

## Plusieurs devises

Le convertissuer actuel est très limité du fait qu'il permet uniquement la conversion euro / dollar. Un meilleur convertisseur permettra de convertir plusieurs autres devises.

## Fonctions avancées

D'autres fonctions plus avancées peuvent être rajoutées, tel que des courbes de tendance montrant la variation du taux de change d'un couple de devise, ou peut-être un système d'alerte permettant de notifier l'utilisateur si le taux de change dépasse un certain seuil (ou tombe au-dessous d'un seuil).