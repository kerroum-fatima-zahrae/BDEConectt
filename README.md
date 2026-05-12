# BDEConnect

## Installation
git clone ...
cd BDEConnect
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
npm run dev
php artisan serve

## Comptes de test
| Rôle    | Email               | Mot de passe |
|---------|---------------------|--------------|
| Admin   | admin@bde.ma        | password     |
| Étudiant| etudiant1@bde.ma    | password     |