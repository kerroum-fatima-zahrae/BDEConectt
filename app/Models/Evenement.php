<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'lieu',
        'capacite_max',
        'prix',
        'image',
    ];

    protected $casts = [
        'date_debut' => 'datetime',
        'date_fin'   => 'datetime',
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function inscriptionsConfirmees()
    {
        return $this->inscriptions()->where('statut', 'confirmée');
    }

    public function isTermine(): bool
    {
        return $this->date_fin->isPast();
    }

    public function isAVenir(): bool
    {
        return $this->date_debut->isFuture();
    }
}