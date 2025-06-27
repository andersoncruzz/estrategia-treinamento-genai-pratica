<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition()
    {
        return [
            'titulo' => $this->faker->words(3, true),
            'descricao' => $this->faker->sentence(10),
            'preco' => $this->faker->randomFloat(2, 5, 500),
            'categoria' => $this->faker->randomElement([
                'Lanches', 
                'Bebidas', 
                'Sobremesas',
                'Saladas',
                'Pizzas',
                'Sushis',
                'Massas',
            ]),
            'imagem_url' => $this->faker->imageUrl(400, 300, 'food'),
            'disponivel' => $this->faker->boolean(90),
            'quantidade_estoque' => $this->faker->numberBetween(0, 100),
        ];
    }
}
