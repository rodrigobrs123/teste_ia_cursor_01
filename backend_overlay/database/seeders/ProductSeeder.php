<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Camiseta Esportiva', 'category_name' => 'Vestuário', 'description' => 'Tecnologia dry-fit, ideal para treinos', 'price' => 79.90, 'image_url' => 'https://images.unsplash.com/photo-1520975657283-cd7c79d58a49?q=80&w=1200&auto=format&fit=crop'],
            ['name' => 'Tênis de Corrida', 'category_name' => 'Calçados', 'description' => 'Amortecimento premium e leveza', 'price' => 499.90, 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'],
            ['name' => 'Bola de Futebol', 'category_name' => 'Acessórios', 'description' => 'Costurada à mão, oficial tamanho 5', 'price' => 129.90, 'image_url' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop'],
            ['name' => 'Shorts de Treino', 'category_name' => 'Vestuário', 'description' => 'Tecido respirável e confortável', 'price' => 89.90, 'image_url' => 'https://images.unsplash.com/photo-1520975744401-5e31e9e1b8df?q=80&w=1200&auto=format&fit=crop'],
        ];

        foreach ($products as $p) {
            DB::table('products')->updateOrInsert(
                ['name' => $p['name']],
                $p + ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}

