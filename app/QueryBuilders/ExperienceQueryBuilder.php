<?php

namespace App\QueryBuilders;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Builder;

class ExperienceQueryBuilder extends Builder
{
    public function work()
    {
        return $this->where('type', Experience::$types['WORK']);
    }

    public function school()
    {
        return $this->where('type', Experience::$types['SCHOOL']);
    }
}
