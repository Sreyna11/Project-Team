<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreeDocument extends Model
{
    protected $table      = 'free_document';
    protected $primaryKey = 'freeDocument_id';
    public $timestamps    = false;

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    // Auto-generate uuid on create
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }


    protected $fillable = [
        'uuid', 'header_id', 'category_id', 'logo', 'title',
        'description', 'file', 'is_active',
        'show_in_header',
    ];

    protected $casts = [
        'show_in_header' => 'boolean',
        'sections'       => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function header()
    {
        return $this->belongsTo(Header::class, 'header_id', 'header_id');
    }
    public function getLogoUrlAttribute(): ?string
    {
        $rawImage = $this->logo;
        if (is_string($rawImage) && $rawImage !== '') {
            if (str_starts_with($rawImage, 'http://') || str_starts_with($rawImage, 'https://')) {
                return $rawImage;
            }
            return route('image.proxy', ['path' => $rawImage]);
        }
        return null;
    }
}