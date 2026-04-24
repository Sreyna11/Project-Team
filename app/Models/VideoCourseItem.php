<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VideoCourseItem extends Model
{
    use HasFactory;

    protected $table      = 'video_course_item';
    protected $primaryKey = 'videoCourseItem_id';
    public $timestamps    = false;

    protected $fillable = [
        'course_item_id',
        'uuid',
        'title',
        'description',
        'video_url',
        'video_file',
        'duration',
        'is_free',
        'is_active',
        'order_num',
    ];

    protected $casts = [
        'is_free'   => 'boolean',
        'is_active' => 'boolean',
        'drop_list' => 'array',
    ];

    // Route model binding uses uuid
    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    // Auto-generate uuid on create
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function course()
    {
        return $this->belongsTo(CourseItem::class, 'course_item_id', 'courseItem_id');
    }
}