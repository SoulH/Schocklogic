<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Event;
use \App\Models\File;;

class EventFile extends Model
{
    use HasFactory;

    protected $table = 'event_files';
    protected $fillable = [
        'event_id',
        'file_id',
        'order'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function event() {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function file() {
        return $this->belongsTo(File::class, 'file_id');
    }
}
