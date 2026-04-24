<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Laravel', 'Node.js', 'React', 'Cyber Security', 'UI/UX Design'];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['name' => $cat]);
        }
    }
}
