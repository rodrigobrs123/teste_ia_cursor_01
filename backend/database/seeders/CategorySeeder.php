<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Futebol',
                'slug' => 'futebol',
                'description' => 'Produtos para futebol: chuteiras, bolas, uniformes e acessórios',
                'image' => 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop'
            ],
            [
                'name' => 'Basquete',
                'slug' => 'basquete',
                'description' => 'Equipamentos para basquete: tênis, bolas, uniformes e acessórios',
                'image' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop'
            ],
            [
                'name' => 'Corrida',
                'slug' => 'corrida',
                'description' => 'Produtos para corrida: tênis, roupas técnicas e acessórios',
                'image' => 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=200&fit=crop'
            ],
            [
                'name' => 'Academia',
                'slug' => 'academia',
                'description' => 'Equipamentos para academia: roupas, acessórios e suplementos',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
            ],
            [
                'name' => 'Natação',
                'slug' => 'natacao',
                'description' => 'Produtos para natação: maiôs, óculos, toucas e acessórios',
                'image' => 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=200&fit=crop'
            ],
            [
                'name' => 'Tênis',
                'slug' => 'tenis',
                'description' => 'Equipamentos para tênis: raquetes, bolas, roupas e acessórios',
                'image' => 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc6b?w=300&h=200&fit=crop'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
