<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Inscription;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_evenements'   => Evenement::count(),
            'total_inscriptions' => Inscription::where('statut', 'confirmée')->count(),
            'en_attente'         => Inscription::where('statut', 'liste_attente')->count(),
            'evenements_recents' => Evenement::withCount('inscriptions')->latest()->take(5)->get(),
        ];

        return inertia('Admin/Dashboard', ['stats' => $stats]);
    }

    public function exportCsv()
    {
        $inscriptions = Inscription::with(['user', 'evenement'])->get();

        $csv = "Nom,Email,Événement,Date inscription,Statut\n";
        foreach ($inscriptions as $i) {
            $csv .= "{$i->user->name},{$i->user->email},{$i->evenement->titre},{$i->date_inscription},{$i->statut}\n";
        }

        return response($csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="inscriptions.csv"',
        ]);
    }
}