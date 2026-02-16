# Analyse du projet afin de préparer un plan d'attaque

## Pré-requis

- Avoir lancé l’application en local
- Avoir lu les endpoints disponibles.
- Avoir cartographié les fichiers de l’application PHP et leurs rôles
- Avoir bien lu les spécifications techniques fournies dans l’énoncé de l’exercice

---

### Lancé l'application en local

Plusieurs problématique rencontrés. Les informations du Readme n'était pas complète pour démarrer directement le projet. Il fallait fouiller un peu dans le dossier.

Afin de pouvoir lancer le projet il faut :

1. Installer Herd
2. Exécuter Herd afin de lier le projet Openclassroom à Herd
3. Installer les dépendances à l'aide composer et npm
4. Exécuter les migrations afin d'alimenter la base de donnée SQLite.
5. Créer le fichier .env afin de configurer les variables locales

---

### Lire les endpoints disponibles

---

### Cartographié les fichiers de l’application PHP et leurs rôles

#### :: routes/web.php

Ce fichier permet de concentrer toutes les redirections de l'UI globale de l'application. On peut voir qu'il y a des routes privées et une route publique.

Route publique :

- /

Routes privées :

- /dashboard
- /settings/profile
- /settings/password
- /settings/appareance
- /notes
- /tags

### :: routes/auth.php

Ce fichier permet de concentré toutes les redirections liées à l'authentification. Elles sont disponible pour deux types d'utilisateurs.
Le "guest" et le "auth".
