<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class EventFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tablename = 'event_files';
        if (DB::table($tablename)->count()) return;
        DB::table($tablename)->insert($this->data());
    }

    private function data() {
        return collect(range(1,14))->map(fn($n) => [
            'event_id' => $n,
            'file_id' => $n,
            'order' => 1
        ])->all();
    }
}
