<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use \App\Models\File;


class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tablename = 'files';
        if (DB::table($tablename)->count()) return;
        DB::table($tablename)->insert($this->data());
    }

    private function data() {
        $path = join(DIRECTORY_SEPARATOR, ['app', 'events']);
        return collect(range(1, 14))->map(fn($n) => [
            'name' => "event$n.1.jpg",
            'path' => $path,
            'mime' => 'image/jpg'
        ])->all();
    }
}
