<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    use HasFactory;
    protected $table = 'event';
    protected $primaryKey = 'event_id';
    public $timestamps = false;
    protected $fillable = ['name', 'start_date', 'end_date'];

    public function promotions()
    {
        return $this->hasMany(Promotion::class, 'event_id', 'event_id');
    }
    public function course()
    {
        return $this->belongsTo(CourseItem::class, 'course_item_id', 'courseItem_id');
    }
}