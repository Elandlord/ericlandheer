<?php

namespace App\Models;

use App\QueryBuilders\ExperienceQueryBuilder;
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
        'from' => 'date',
        'until' => 'date',
    ];

    public function newEloquentBuilder($query): ExperienceQueryBuilder
    {
        return new ExperienceQueryBuilder($query);
    }
}
