<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{

    use HasFactory;
    protected $table = 'contact';
    protected $primaryKey = 'contact_id';
    public $timestamps = false;
    protected $fillable = ['full_name', 'email', 'subject', 'message', 'sent_at'];
    protected $casts = ['sent_at' => 'datetime'];
}