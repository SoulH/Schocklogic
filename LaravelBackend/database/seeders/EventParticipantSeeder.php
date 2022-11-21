<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use carbon\Carbon;

class EventParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tablename = 'event_participants';
        if (DB::table($tablename)->count()) return;
        DB::table($tablename)->insert($this->data());
    }

    private function data() {
        // [event_id ...]
        $e = collect(range(1,14)); 
        // [[event_id, person_id] ...]
        $ep = $e->map(fn($e) => collect($e)->crossJoin(range(1, random_int(2, 21)))->all())->collapse();
        // [[event_id, person_id, created_at] ...]
        $epd = $ep->map(fn($li) => collect($li)->concat([Carbon::now()->addDays(random_int(2,5))->addMinutes(random_int(60,720))])->all());
        // [['event_id' => event_id, 'person_id' => person_id, 'created_at' => created_at] ...]
        return $epd->map(fn($li) => collect(['event_id', 'person_id', 'created_at'])->combine($li)->all())->all();
    }
}
