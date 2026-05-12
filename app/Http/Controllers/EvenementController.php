<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Http\Requests\StoreEvenementRequest;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    // Page publique — RG5 : seulement les événements à venir
    public function index()
    {
        $evenements = Evenement::where('date_debut', '>', now())
            ->withCount(['inscriptions as inscriptions_confirmees_count' => function ($q) {
                $q->where('statut', 'confirmée');
            }])
            ->get();

        return inertia('Home', ['evenements' => $evenements]);
    }

    public function show(Evenement $evenement)
    {
        return inertia('Evenement/Show', ['evenement' => $evenement]);
    }

    // Admin — liste tous les événements
    public function adminIndex()
    {
        $evenements = Evenement::withCount('inscriptions')->latest()->get();
        return inertia('Admin/Evenements/Index', ['evenements' => $evenements]);
    }

    public function create()
    {
        return inertia('Admin/Evenements/Create');
    }

    public function store(StoreEvenementRequest $request)
    {
        Evenement::create($request->validated());
        return redirect()->route('admin.evenements.index')->with('success', 'Événement créé.');
    }

    public function edit(Evenement $evenement)
    {
        // RG4 — Verrouillage temporel
        if ($evenement->isTermine()) {
            abort(403, 'Impossible de modifier un événement terminé.');
        }
        return inertia('Admin/Evenements/Edit', ['evenement' => $evenement]);
    }

    public function update(StoreEvenementRequest $request, Evenement $evenement)
    {
        // RG4 — Verrouillage temporel
        if ($evenement->isTermine()) {
            abort(403, 'Impossible de modifier un événement terminé.');
        }
        $evenement->update($request->validated());
        return redirect()->route('admin.evenements.index')->with('success', 'Événement mis à jour.');
    }

    public function destroy(Evenement $evenement)
    {
        $evenement->delete();
        return redirect()->route('admin.evenements.index')->with('success', 'Événement supprimé.');
    }
}