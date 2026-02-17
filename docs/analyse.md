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
4. Exécuter les migrations afin d'alimenter la base de données SQLite.
5. Créer le fichier .env afin de configurer les variables locales

Optionnel : Installer sur VSCode SQLite Viewver

---

### Lire les endpoints disponibles

#### Routes publiques

| Méthode | URL                       | Nom                | Type |
| ------- | ------------------------- | ------------------ | ---- |
| GET     | `/login`                  | `login`            | Volt |
| GET     | `/register`               | `register`         | Volt |
| GET     | `/forgot-password`        | `password.request` | Volt |
| GET     | `/reset-password/{token}` | `password.reset`   | Volt |

#### Routes privées

| Méthode | URL                         | Nom                   | Type       |
| ------- | --------------------------- | --------------------- | ---------- |
| GET     | `/verify-email`             | `verification.notice` | Volt       |
| GET     | `/verify-email/{id}/{hash}` | `verification.verify` | Controller |
| GET     | `/confirm-password`         | `password.confirm`    | Volt       |

#### Déconnexion

| Méthode | URL       | Nom      | Type            |
| ------- | --------- | -------- | --------------- |
| POST    | `/logout` | `logout` | Action Livewire |

> Les routes d’authentification sont actuellement implémentées via Volt (Livewire) et correspondent à des routes web retournant des vues HTML.
> Elles ne constituent pas des endpoints API REST JSON.
> Une adaptation sera nécessaire si l’auth doit être consommée par l’interface React via une API.

---

### Cartographier les fichiers de l’application PHP et leurs rôles

#### :: routes/

#### web.php

> Ce fichier permet de concentrer toutes les routes WEB de l'application. On peut voir qu'il y a des routes privées et une route publique.

Route publique :

- /

Routes privées :

- /dashboard
- /settings/profile
- /settings/password
- /settings/appareance
- /notes
- /tags

#### routes/auth.php

> Ce fichier permet de concentrer toutes les redirections liées à l'authentification. Elles sont disponible pour deux types d'utilisateurs. Le **guest** et le **auth**.

### :: resources/views

Ce dossier contient toute la partie VUE de l'application.

#### welcome.blade.php

> La page d'accueil de l'application. Cette page contient deux blocs important. Une partie avec des boutons d'action pour se connecter ou créer un compte. Une partie centrale qui présente l'application 'Renote'.

#### dashboard.blade.php

> Le fichier dashboard.blade.php constitue la vue principale accessible uniquement aux utilisateurs **authentifiés** (middleware auth). Il sert de structure principale de l’interface et centralise l’accès aux fonctionnalités métier telles que la gestion des notes et des tags.

### :: resources/views/components

> Ce dossier contient tout les composants réutilisable via Blade.

### :: resources/views/flux

> Ce dossier contient tout les composants UI géré par la librairie Flux.

### :: resources/views/livewire

> Ce dossier contient les vues associées au composants.

### :: resources/views/partials

> Ce dossier contient les templates pouvant être implémenter dans toutes les vues.
