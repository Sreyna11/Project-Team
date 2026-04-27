<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CourseItem extends Model
{
    protected $table = 'course_item';
    protected $primaryKey = 'courseItem_id';
    public $timestamps = true;

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

    // Add uuid to fillable
    protected $fillable = [
        'header_id',
        'category_id',
        'image',
        'title',
        'description',
        'price',
        'discount',
        'original_price',
        'button',
        'is_active',
        'show_in_header',
        'max_modules',
        'instructor',
        'rating',
        'total_students',
        'is_hot',
        'duration',
        'uuid', // ← add uuid
    ];

    protected $casts = [
        'price' => 'float',
        'discount' => 'float',
        'original_price' => 'float',
        'rating' => 'float',
        'is_active' => 'boolean',
        'show_in_header' => 'boolean',
        'is_hot' => 'boolean',
        'max_modules' => 'integer',
        'total_students' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function header()
    {
        return $this->belongsTo(Header::class, 'header_id', 'header_id');
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

    public function promotions()
    {
        return $this->hasMany(Promotion::class, 'course_item_id', 'courseItem_id');
    }

    public function activePromotion()
    {
        return $this->hasOne(Promotion::class, 'course_item_id', 'courseItem_id')
            ->where('start_date', '<=', now()->toDateString())
            ->where('end_date', '>=', now()->toDateString())
            ->latest('promotion_id');
    }

    public function getFinalPriceAttribute(): float
    {
        $promo = $this->activePromotion;
        if ($promo) {
            return $promo->finalPrice((float) $this->price);
        }
        return (float) $this->price;
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        $rawImage = $this->image;
        if (is_string($rawImage) && $rawImage !== '') {
            if (str_starts_with($rawImage, 'http://') || str_starts_with($rawImage, 'https://')) {
                return $rawImage;
            }
            return route('image.proxy', ['path' => $rawImage]);
        }
        return null;
    }
}