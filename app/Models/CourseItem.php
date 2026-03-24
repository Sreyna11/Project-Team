<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseItem extends Model
{
    protected $table = 'course_item';
    protected $primaryKey = 'courseItem_id';
    public $timestamps = false;

    protected $fillable = [
        'header_id',
        'category_id',
        'image',
        'title',
        'description',
        'price',
        'discount',
        'button',
        'is_active',
        'show_in_header',
    ];

    protected $casts = [
        'price' => 'float',
        'discount' => 'float',
        'is_active' => 'boolean',
        'show_in_header' => 'boolean',
    ];

    public function getImageAttribute($value)
    {
        if (!$value) return null;
        if (filter_var($value, FILTER_VALIDATE_URL)) return $value;
        return asset('storage/' . $value);
    }

    // ← must be named exactly 'header'
    public function header()
    {
        return $this->belongsTo(Header::class, 'header_id', 'header_id');
    }

    // ← must be named exactly 'category'
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function videoModules()
    {
        return $this->hasMany(VideoCourseItem::class, 'course_item_id', 'courseItem_id')
            ->orderBy('order_num');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'course_item_id', 'courseItem_id');
    }
    public function promotion()
    {
        return $this->hasOne(Promotion::class, 'course_item_id', 'courseItem_id');
    }

    public function activePromotion()
    {
        return $this->hasOne(Promotion::class, 'course_item_id', 'courseItem_id')
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now());
    }
}