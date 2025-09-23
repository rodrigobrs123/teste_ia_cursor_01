<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $futebolCategory = Category::where('slug', 'futebol')->first();
        $basqueteCategory = Category::where('slug', 'basquete')->first();
        $corridaCategory = Category::where('slug', 'corrida')->first();
        $academiaCategory = Category::where('slug', 'academia')->first();

        $products = [
            // Futebol
            [
                'name' => 'Chuteira Nike Mercurial Vapor',
                'slug' => 'chuteira-nike-mercurial-vapor',
                'description' => 'Chuteira profissional Nike Mercurial Vapor com tecnologia avançada para máximo desempenho em campo. Solado com travas estratégicas para tração superior.',
                'short_description' => 'Chuteira profissional Nike com tecnologia avançada',
                'price' => 599.99,
                'sale_price' => 499.99,
                'sku' => 'NIKE-MV-001',
                'stock_quantity' => 50,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&sat=50'
                ],
                'specifications' => [
                    'Material' => 'Couro sintético',
                    'Solado' => 'TPU com travas',
                    'Peso' => '280g',
                    'Indicado para' => 'Campo natural'
                ],
                'brand' => 'Nike',
                'size' => '42',
                'color' => 'Preto/Laranja',
                'weight' => 0.28,
                'category_id' => $futebolCategory->id
            ],
            [
                'name' => 'Bola Adidas Champions League',
                'slug' => 'bola-adidas-champions-league',
                'description' => 'Bola oficial da Champions League, com tecnologia FIFA Quality Pro. Perfeita para jogos profissionais e treinos de alto nível.',
                'short_description' => 'Bola oficial da Champions League',
                'price' => 199.99,
                'sku' => 'ADIDAS-CL-001',
                'stock_quantity' => 30,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Tamanho' => '5 (oficial)',
                    'Material' => 'Couro sintético',
                    'Certificação' => 'FIFA Quality Pro',
                    'Peso' => '410-450g'
                ],
                'brand' => 'Adidas',
                'weight' => 0.43,
                'category_id' => $futebolCategory->id
            ],
            
            // Basquete
            [
                'name' => 'Tênis Air Jordan Retro',
                'slug' => 'tenis-air-jordan-retro',
                'description' => 'Tênis icônico Air Jordan com design clássico e tecnologia moderna. Perfeito para jogos e uso casual.',
                'short_description' => 'Tênis icônico Air Jordan com design clássico',
                'price' => 899.99,
                'sale_price' => 749.99,
                'sku' => 'JORDAN-RET-001',
                'stock_quantity' => 25,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Material' => 'Couro e mesh',
                    'Solado' => 'Borracha com tração',
                    'Tecnologia' => 'Air cushioning',
                    'Altura' => 'Cano médio'
                ],
                'brand' => 'Nike',
                'size' => '42',
                'color' => 'Preto/Vermelho',
                'weight' => 0.65,
                'category_id' => $basqueteCategory->id
            ],
            [
                'name' => 'Bola Spalding NBA',
                'slug' => 'bola-spalding-nba',
                'description' => 'Bola oficial da NBA, utilizada nos jogos profissionais. Material premium com grip superior.',
                'short_description' => 'Bola oficial da NBA',
                'price' => 299.99,
                'sku' => 'SPALDING-NBA-001',
                'stock_quantity' => 20,
                'images' => [
                    'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Tamanho' => '7 (oficial)',
                    'Material' => 'Couro genuíno',
                    'Peso' => '567-650g',
                    'Uso' => 'Indoor/Outdoor'
                ],
                'brand' => 'Spalding',
                'weight' => 0.61,
                'category_id' => $basqueteCategory->id
            ],

            // Corrida
            [
                'name' => 'Tênis Nike Air Zoom Pegasus',
                'slug' => 'tenis-nike-air-zoom-pegasus',
                'description' => 'Tênis de corrida com tecnologia Nike Air Zoom para máximo conforto e performance. Ideal para treinos diários e provas.',
                'short_description' => 'Tênis de corrida com tecnologia Nike Air Zoom',
                'price' => 549.99,
                'sku' => 'NIKE-PEG-001',
                'stock_quantity' => 40,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Drop' => '10mm',
                    'Peso' => '285g',
                    'Tecnologia' => 'Air Zoom',
                    'Indicado para' => 'Corridas longas'
                ],
                'brand' => 'Nike',
                'size' => '42',
                'color' => 'Azul/Branco',
                'weight' => 0.57,
                'category_id' => $corridaCategory->id
            ],
            [
                'name' => 'Camiseta Dri-Fit Running',
                'slug' => 'camiseta-dri-fit-running',
                'description' => 'Camiseta técnica com tecnologia Dri-Fit para corrida. Tecido leve e respirável que afasta o suor.',
                'short_description' => 'Camiseta técnica com tecnologia Dri-Fit',
                'price' => 89.99,
                'sku' => 'NIKE-DRI-001',
                'stock_quantity' => 60,
                'images' => [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Material' => '100% Poliéster',
                    'Tecnologia' => 'Dri-FIT',
                    'Ajuste' => 'Regular',
                    'Proteção UV' => 'FPU 15+'
                ],
                'brand' => 'Nike',
                'size' => 'M',
                'color' => 'Azul',
                'weight' => 0.12,
                'category_id' => $corridaCategory->id
            ],

            // Academia
            [
                'name' => 'Whey Protein Concentrado',
                'slug' => 'whey-protein-concentrado',
                'description' => 'Suplemento de whey protein concentrado com alta qualidade e sabor chocolate. Ideal para ganho de massa muscular.',
                'short_description' => 'Suplemento de whey protein concentrado',
                'price' => 149.99,
                'sku' => 'WHEY-CHOC-001',
                'stock_quantity' => 35,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Peso líquido' => '900g',
                    'Proteína por dose' => '24g',
                    'Sabor' => 'Chocolate',
                    'Porções' => '30'
                ],
                'brand' => 'Max Titanium',
                'weight' => 0.9,
                'category_id' => $academiaCategory->id
            ],
            [
                'name' => 'Luvas de Treino Academia',
                'slug' => 'luvas-treino-academia',
                'description' => 'Luvas de treino com proteção e aderência superior. Ideais para levantamento de peso e exercícios com barra.',
                'short_description' => 'Luvas de treino com proteção superior',
                'price' => 49.99,
                'sku' => 'LUVAS-ACAD-001',
                'stock_quantity' => 45,
                'images' => [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
                ],
                'specifications' => [
                    'Material' => 'Couro sintético',
                    'Proteção' => 'Palma reforçada',
                    'Fechamento' => 'Velcro',
                    'Tamanho' => 'Ajustável'
                ],
                'brand' => 'Adidas',
                'size' => 'M',
                'color' => 'Preto',
                'weight' => 0.15,
                'category_id' => $academiaCategory->id
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
