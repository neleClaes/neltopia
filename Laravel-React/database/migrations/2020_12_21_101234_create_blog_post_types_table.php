<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_post_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blog_post_id');
            $table->unsignedBigInteger('type_id');
            $table->timestamps();

            $table->foreign('blog_post_id')->references('id')->on('blog_posts');
            $table->foreign('type_id')->references('id')->on('types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_post_types');
    }
}
