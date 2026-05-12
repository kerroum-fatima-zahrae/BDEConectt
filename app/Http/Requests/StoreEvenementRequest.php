<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvenementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titre'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'date_debut'   => 'required|date|after:now',
            'date_fin'     => 'required|date|after:date_debut',
            'lieu'         => 'required|string|max:255',
            'capacite_max' => 'required|integer|min:1',
            'prix'         => 'required|numeric|min:0',
            'image'        => 'nullable|image|max:2048',
        ];
    }
}