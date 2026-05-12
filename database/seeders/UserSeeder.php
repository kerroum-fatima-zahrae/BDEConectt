<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin BDE',
            'email' => 'admin@bde.ma',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Etudiant 1',
            'email' => 'etudiant1@bde.ma',
            'password' => bcrypt('password'),
            'role' => 'etudiant',
        ]);
        User::create([
            'name' => 'Etudiant 2',
            'email' => 'etudiant2@bde.ma',
            'password' => bcrypt('password'),
            'role' => 'etudiant',
        ]);
        User::create([
            'name' => 'Etudiant 3',
            'email' => 'etudiant3@bde.ma',
            'password' => bcrypt('password'),
            'role' => 'etudiant',
        ]);
    }
}