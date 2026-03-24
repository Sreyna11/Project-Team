<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeDocument extends Model
{

    use HasFactory;
    protected $table = 'free_document';
    protected $primaryKey = 'freeDocument_id';
    public $timestamps = false;
    protected $fillable = [
        'header_id',
        'logo',
        'title',
        'description',
        'file',
        'category_id',
        'is_active',
        'show_in_header',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'show_in_header' => 'boolean',
    ];

    public function getLogoAttribute($value)
    {
        if (!$value) return null;
        if (filter_var($value, FILTER_VALIDATE_URL)) return $value;
        return asset('storage/' . $value);
    }

    public function header()
    {
        return $this->belongsTo(Header::class, 'header_id', 'header_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }
}

