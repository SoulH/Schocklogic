<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\EventFile;
use \App\Models\EventParticipant;


class Event extends Model
{
    use HasFactory;

    protected $table = 'events';
    protected $fillable = [
        'id',
        'name',
        'description',
        'start',
        'end',
        'web_page',
        'address',
        'location',
        'social_networks',
        'tags',
        'created_at'
    ];
    protected $hidden = ['updated_at'];
    protected $casts = [
        'location' => 'array',
        'tags' => 'array',
        'social_networks' => 'array',
        'start' => 'date',
        'end' => 'date'
    ];

    public function files() {
        return $this->hasMany(EventFile::class, 'event_id');
    }

    public function participants() {
        return $this->hasMany(EventParticipant::class, 'event_id');
    }
}
