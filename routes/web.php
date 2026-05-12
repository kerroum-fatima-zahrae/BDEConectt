<?php

use App\Http\Controllers\EvenementController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Page publique
Route::get('/', [EvenementController::class, 'index'])->name('home');

// Routes étudiant connecté
Route::middleware(['auth'])->group(function () {
    Route::post('/evenements/{evenement}/inscrire', [InscriptionController::class, 'store'])->name('inscription.store');
    Route::patch('/inscriptions/{inscription}/annuler', [InscriptionController::class, 'annuler'])->name('inscription.annuler');
    Route::get('/mes-inscriptions', [InscriptionController::class, 'mesInscriptions'])->name('inscription.mes');
});

// Routes admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/export-csv', [DashboardController::class, 'exportCsv'])->name('export');
    Route::get('/evenements', [EvenementController::class, 'adminIndex'])->name('evenements.index');
    Route::get('/evenements/create', [EvenementController::class, 'create'])->name('evenements.create');
    Route::post('/evenements', [EvenementController::class, 'store'])->name('evenements.store');
    Route::get('/evenements/{evenement}/edit', [EvenementController::class, 'edit'])->name('evenements.edit');
    Route::put('/evenements/{evenement}', [EvenementController::class, 'update'])->name('evenements.update');
    Route::delete('/evenements/{evenement}', [EvenementController::class, 'destroy'])->name('evenements.destroy');
});

require __DIR__.'/auth.php';