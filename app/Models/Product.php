<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'preco',
        'categoria',
        'imagem_url',
        'disponivel',
        'quantidade_estoque',
    ];
}
