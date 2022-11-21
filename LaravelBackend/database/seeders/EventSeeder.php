<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tablename = 'events';
        if (DB::table($tablename)->count()) return;
        DB::table($tablename)->insert($this->data());
    }

    private function data() {
        return collect(range(1, 14))->map(fn($n) =>
        [
            'name' => "Event $n", 
            'description' => 'Ipsum cupidatat voluptate cupidatat duis exercitation esse cupidatat ut fugiat voluptate aute ea sit aliqua.',
            'address' => 'Minim veniam cupidatat anim irure irure enim cupidatat anim irure.',
            'location' => '{"lat": 10.433728, "lgn": -66.9407432}',
            'start' => Carbon::now()->addWeeks(1),
            'end' => Carbon::now()->addWeeks(1)->addDays(3),
            'web_page' => 'www.yourinfoticket.com',
            'social_networks' => '{"instagram": "@yourinfoticket.com"}',
            'tags' => '["music"]',
            'created_at' => Carbon::now()
        ])->all();
    }
}
