<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPostType extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'blog_post_id', 'type_id'];
}
