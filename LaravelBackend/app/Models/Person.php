<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    public $table = 'persons';
    protected $fillable = [
        'id', 
        'identification',
        'first_name', 
        'last_name', 
        'business_name',
        'birth_date'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
