<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;
    protected $table = 'header';
    protected $primaryKey = 'header_id';
    public $timestamps = false;
    protected $fillable = ['title', 'description', 'order_num'];

    public function courses()
    {
        return $this->hasMany(CourseItem::class, 'header_id', 'header_id');
    }

    public function freeDocuments()
    {
        return $this->hasMany(FreeDocument::class, 'header_id', 'header_id');
    }
}
