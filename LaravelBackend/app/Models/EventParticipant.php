<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Event;
use \App\Models\Person;

class EventParticipant extends Model
{
    use HasFactory;

    protected $table = 'event_participants';
    protected $fillable = [
        'event_id',
        'participant_id',
        'event_role_id',
        'revoked',
        'created_at',
        'updated_at'
    ];
    protected $hidden = [];

    public function event() {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function participant() {
        return $this->belongsTo(Person::class, 'person_id');
    }
}
