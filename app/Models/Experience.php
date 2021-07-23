<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    public static array $types = [
        'WORK' => 'WORK',
        'SCHOOL' => 'SCHOOL',
    ];

    protected $fillable = [
        'image',
        'title',
        'description',
        'company',
        'city',
        'type',
    ];

    protected $casts = [
        'from' => 'datetime',
        'until' => 'datetime',
    ];
}
