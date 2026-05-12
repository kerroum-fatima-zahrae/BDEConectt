<?php

namespace Tests\Unit;

use App\Models\Evenement;
use App\Models\Inscription;
use App\Models\User;
use App\Services\InscriptionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InscriptionServiceTest extends TestCase
{
    use RefreshDatabase;

    private InscriptionService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new InscriptionService();
    }

    public function test_inscription_confirmee_si_place_disponible(): void
    {
        $etudiant = User::create([
            'name'     => 'Etudiant Test',
            'email'    => 'test@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $evenement = Evenement::create([
            'titre'        => 'Evenement Test',
            'description'  => 'Description',
            'date_debut'   => now()->addDays(1),
            'date_fin'     => now()->addDays(2),
            'lieu'         => 'Nador',
            'capacite_max' => 5,
            'prix'         => 0,
        ]);

        $result = $this->service->inscrire($etudiant->id, $evenement);

        $this->assertTrue($result['success']);
        $this->assertEquals('confirmée', $result['statut']);
    }

    public function test_inscription_en_liste_attente_si_complet(): void
    {
        $evenement = Evenement::create([
            'titre'        => 'Evenement Complet',
            'description'  => 'Description',
            'date_debut'   => now()->addDays(1),
            'date_fin'     => now()->addDays(2),
            'lieu'         => 'Nador',
            'capacite_max' => 1,
            'prix'         => 0,
        ]);

        $etudiant1 = User::create([
            'name'     => 'Etudiant 1',
            'email'    => 'etudiant1@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $etudiant2 = User::create([
            'name'     => 'Etudiant 2',
            'email'    => 'etudiant2@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $this->service->inscrire($etudiant1->id, $evenement);
        $result = $this->service->inscrire($etudiant2->id, $evenement);

        $this->assertTrue($result['success']);
        $this->assertEquals('liste_attente', $result['statut']);
    }

    public function test_promotion_en_cascade_apres_annulation(): void
    {
        $evenement = Evenement::create([
            'titre'        => 'Evenement Cascade',
            'description'  => 'Description',
            'date_debut'   => now()->addDays(1),
            'date_fin'     => now()->addDays(2),
            'lieu'         => 'Nador',
            'capacite_max' => 1,
            'prix'         => 0,
        ]);

        $etudiant1 = User::create([
            'name'     => 'Etudiant 1',
            'email'    => 'e1@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $etudiant2 = User::create([
            'name'     => 'Etudiant 2',
            'email'    => 'e2@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $this->service->inscrire($etudiant1->id, $evenement);
        $this->service->inscrire($etudiant2->id, $evenement);

        $inscription1 = Inscription::where('user_id', $etudiant1->id)->first();
        $this->service->annuler($inscription1);

        $inscription2 = Inscription::where('user_id', $etudiant2->id)->first();
        $this->assertEquals('confirmée', $inscription2->fresh()->statut);
    }

    public function test_unicite_inscription(): void
    {
        $etudiant = User::create([
            'name'     => 'Etudiant Unique',
            'email'    => 'unique@test.com',
            'password' => bcrypt('password'),
            'role'     => 'etudiant',
        ]);

        $evenement = Evenement::create([
            'titre'        => 'Evenement Unique',
            'description'  => 'Description',
            'date_debut'   => now()->addDays(1),
            'date_fin'     => now()->addDays(2),
            'lieu'         => 'Nador',
            'capacite_max' => 10,
            'prix'         => 0,
        ]);

        $result1 = $this->service->inscrire($etudiant->id, $evenement);
        $this->assertTrue($result1['success']);

        $result2 = $this->service->inscrire($etudiant->id, $evenement);
        $this->assertFalse($result2['success']);
        $this->assertEquals('Déjà inscrit à cet événement.', $result2['message']);
    }
}