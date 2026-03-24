<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoCourseItem extends Model
{

    use HasFactory;
    protected $table = 'video_course_item';
    protected $primaryKey = 'videoCourseItem_id';
    public $timestamps = false;
    protected $fillable = [
        'course_item_id',
        'title',
        'description',
        'video_url',
        'duration',
        'is_free',
        'is_active',
        'order_num',
    ];
    protected $casts = ['is_free' => 'boolean', 'is_active' => 'boolean'];

    public function course()
    {
        return $this->belongsTo(CourseItem::class, 'course_item_id', 'courseItem_id');
    }
}