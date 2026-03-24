<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{

    use HasFactory;
    protected $table = 'promotion';
    protected $primaryKey = 'promotion_id';
    public $timestamps = false;
    protected $fillable = ['event_id', 'course_item_id', 'promotion_name', 'promotion_type', 'discount_value', 'start_date', 'end_date'];
    protected $casts = ['discount_value' => 'float'];

    public function finalPrice(float $original): float
    {
        if ($this->promotion_type === 'percent')
            return round($original * (1 - $this->discount_value / 100), 2);
        return max(0, round($original - $this->discount_value, 2));
    }

    public function course()
    {
        return $this->belongsTo(CourseItem::class, 'course_item_id', 'courseItem_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }
}