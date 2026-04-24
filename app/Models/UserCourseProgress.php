<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCourseProgress extends Model
{
    protected $table = 'user_course_progress';
    protected $primaryKey = 'progress_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'courseItem_id',
        'videoCourseItem_id',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];
}