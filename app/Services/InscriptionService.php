<?php

namespace App\Services;

use App\Models\Evenement;
use App\Models\Inscription;
use Illuminate\Support\Facades\DB;

class InscriptionService
{
    public function inscrire(int $userId, Evenement $evenement): array
    {
        // RG2 — Unicité
        $existe = Inscription::where('user_id', $userId)
            ->where('evenement_id', $evenement->id)
            ->whereIn('statut', ['confirmée', 'liste_attente'])
            ->exists();

        if ($existe) {
            return ['success' => false, 'message' => 'Déjà inscrit à cet événement.'];
        }

        // RG1 — Liste d'attente automatique
        $nbConfirmes = $evenement->inscriptionsConfirmees()->count();
        $statut = $nbConfirmes < $evenement->capacite_max ? 'confirmée' : 'liste_attente';

        Inscription::create([
            'user_id'          => $userId,
            'evenement_id'     => $evenement->id,
            'statut'           => $statut,
            'date_inscription' => now(),
        ]);

        return ['success' => true, 'statut' => $statut];
    }

    public function annuler(Inscription $inscription): void
    {
        DB::transaction(function () use ($inscription) {
            $ancienStatut = $inscription->statut;
            $inscription->update(['statut' => 'annulée']);

            // RG3 — Promotion en cascade
            if ($ancienStatut === 'confirmée') {
                $suivant = Inscription::where('evenement_id', $inscription->evenement_id)
                    ->where('statut', 'liste_attente')
                    ->orderBy('date_inscription')
                    ->first();

                if ($suivant) {
                    $suivant->update(['statut' => 'confirmée']);
                }
            }
        });
    }
}