<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Inscription;
use App\Services\InscriptionService;

class InscriptionController extends Controller
{
    public function __construct(private InscriptionService $service) {}

    public function store(Evenement $evenement)
    {
        $result = $this->service->inscrire(auth()->id(), $evenement);

        if (!$result['success']) {
            return back()->with('error', $result['message']);
        }

        $msg = $result['statut'] === 'confirmée'
            ? 'Inscription confirmée !'
            : 'Vous êtes en liste d\'attente.';

        return back()->with('success', $msg);
    }

    public function annuler(Inscription $inscription)
    {
        abort_if($inscription->user_id !== auth()->id(), 403);
        $this->service->annuler($inscription);
        return back()->with('success', 'Inscription annulée.');
    }

    public function mesInscriptions()
    {
        $inscriptions = auth()->user()
            ->inscriptions()
            ->with('evenement')
            ->latest()
            ->get();

        return inertia('MesInscriptions', ['inscriptions' => $inscriptions]);
    }
}