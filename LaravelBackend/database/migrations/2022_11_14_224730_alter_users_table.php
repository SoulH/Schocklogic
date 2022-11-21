<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->string('name', 32)->change();
            $table->boolean('is_staff')->default(false);
            $table->boolean('is_superuser')->default(false);
            $table->boolean('is_active')->default(false);
            $table->bigInteger('person_id');
            $table->foreign('person_id')->references('id')->on('persons')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->string('name', 255)->change();
            $table->dropColumn('is_staff');
            $table->dropColumn('is_superuser');
            $table->dropColumn('is_active');
            $table->dropColumn('person_id');
        });
    }
}
