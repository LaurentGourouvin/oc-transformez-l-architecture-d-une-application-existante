# Project Analysis – Preparing an Implementation Plan

## Prerequisites

- The application must be running locally
- The available routes/endpoints must have been reviewed
- The PHP application structure and file responsibilities must be mapped
- The technical specifications provided in the exercise statement must be carefully read

---

## Running the Application Locally

Several issues were encountered. The information provided in the original README was not sufficient to start the project directly. Some exploration of the project structure was required.

To successfully run the project:

1. Install **Laravel Herd**
2. Launch Herd and link the OpenClassrooms project to Herd
3. Install dependencies using `composer` and `npm`
4. Run the migrations to populate the SQLite database
5. Create the `.env` file to configure local environment variables

Optional: Install a **SQLite Viewer extension in VS Code** to inspect the database.

---

## Reviewing the Available Routes

### Public Routes

| Method | URL                       | Name               | Type |
| ------ | ------------------------- | ------------------ | ---- |
| GET    | `/login`                  | `login`            | Volt |
| GET    | `/register`               | `register`         | Volt |
| GET    | `/forgot-password`        | `password.request` | Volt |
| GET    | `/reset-password/{token}` | `password.reset`   | Volt |

### Protected Routes

| Method | URL                         | Name                  | Type       |
| ------ | --------------------------- | --------------------- | ---------- |
| GET    | `/verify-email`             | `verification.notice` | Volt       |
| GET    | `/verify-email/{id}/{hash}` | `verification.verify` | Controller |
| GET    | `/confirm-password`         | `password.confirm`    | Volt       |

### Logout

| Method | URL       | Name     | Type            |
| ------ | --------- | -------- | --------------- |
| POST   | `/logout` | `logout` | Livewire Action |

> Authentication routes are currently implemented using Volt (Livewire) and correspond to web routes that return HTML views.  
> They are **not** JSON REST API endpoints.  
> An adaptation will be required if authentication needs to be consumed by the React interface through an API.

---

## Mapping the PHP Application Structure and Responsibilities

### :: routes/

#### `web.php`

This file centralizes all **web routes** of the application.  
It contains both public and protected routes.

Public route:

- `/`

Protected routes:

- `/dashboard`
- `/settings/profile`
- `/settings/password`
- `/settings/appearance`
- `/notes`
- `/tags`

#### `routes/auth.php`

This file centralizes all authentication-related routes.  
They are available for two types of users:

- **guest**
- **authenticated**

---

## :: resources/views

This directory contains the entire **View layer** of the application.

### `welcome.blade.php`

The landing page of the application.  
It contains two main sections:

- An action area allowing users to log in or register
- A central section introducing the application **Renote**

### `dashboard.blade.php`

The `dashboard.blade.php` file is the main view accessible only to **authenticated users** (via the `auth` middleware).  
It serves as the primary interface structure and centralizes access to core business features such as note and tag management.

---

## :: resources/views/components

This directory contains reusable Blade components.

---

## :: resources/views/flux

This directory contains UI components managed by the **Flux** library.

---

## :: resources/views/livewire

This directory contains views associated with Livewire components.

---

## :: resources/views/partials

This directory contains reusable view fragments that can be included across multiple views.
