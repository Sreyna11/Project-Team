<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{

    use HasFactory;
    protected $table = 'payment';
    protected $primaryKey = 'payment_id';
    public $timestamps = false;
    protected $fillable = ['user_id', 'course_item_id', 'promotion_id', 'invoice_number', 'md5', 'amount', 'status', 'paid_at'];
    protected $casts = ['amount' => 'float', 'paid_at' => 'datetime'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function course()
    {
        return $this->belongsTo(CourseItem::class, 'course_item_id', 'courseItem_id');
    }
    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'promotion_id', 'promotion_id');
    }
}