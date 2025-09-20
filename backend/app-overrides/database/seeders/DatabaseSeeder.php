<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->truncate();

        $products = [
            [
                'name' => 'Tênis de Corrida Pro',
                'description' => 'Amortecimento responsivo e respirável para longas distâncias.',
                'price_cents' => 49990,
                'image_url' => 'https://images.unsplash.com/photo-1542293787938-c9e299b88054?q=80&w=1200&auto=format&fit=crop',
                'stock' => 25,
            ],
            [
                'name' => 'Luva de Academia Elite',
                'description' => 'Aderência superior e conforto para treinos intensos.',
                'price_cents' => 12990,
                'image_url' => 'https://images.unsplash.com/photo-1599050751796-5be4f3d5037a?q=80&w=1200&auto=format&fit=crop',
                'stock' => 80,
            ],
            [
                'name' => 'Camiseta Dry-Fit Tech',
                'description' => 'Tecido tecnológico que afasta o suor e mantém o corpo seco.',
                'price_cents' => 8990,
                'image_url' => 'https://images.unsplash.com/photo-1520975922215-230d89c37eaa?q=80&w=1200&auto=format&fit=crop',
                'stock' => 120,
            ],
            [
                'name' => 'Garrafa Térmica 1L',
                'description' => 'Aço inox com isolamento a vácuo, mantém a temperatura por 12h.',
                'price_cents' => 7990,
                'image_url' => 'https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1200&auto=format&fit=crop',
                'stock' => 60,
            ],
            [
                'name' => 'Shorts de Corrida Aero',
                'description' => 'Ultra leve com bolso interno e ventilação estratégica.',
                'price_cents' => 9990,
                'image_url' => 'https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1200&auto=format&fit=crop',
                'stock' => 70,
            ],
            [
                'name' => 'Halteres Ajustáveis 20kg',
                'description' => 'Sistema de travas rápido, ajuste em segundos.',
                'price_cents' => 39990,
                'image_url' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
                'stock' => 15,
            ],
        ];

        foreach ($products as $p) {
            Product::create($p);
        }
    }
}

