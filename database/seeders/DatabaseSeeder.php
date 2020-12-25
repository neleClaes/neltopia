<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(['name' => 'user']);
        DB::table('roles')->insert(['name' => 'admin']);

        DB::table('users')->insert(['name' => 'nele', 'email' => 'nele.claes03@gmail.com', 'password' => bcrypt('password'), 'role_id' => 2]);
        DB::table('users')->insert(['name' => 'admin', 'email' => 'admin@gmail.com', 'password' => bcrypt('password'), 'role_id' => 2]);
        DB::table('users')->insert(['name' => 'gebruiker', 'email' => 'gebruiker@gmail.com', 'password' => bcrypt('123456'), 'role_id' => 1]);
    }
}
