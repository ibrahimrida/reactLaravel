<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;




class UserManagement extends Model
{
    public function registerNewUser($data){
        DB::table('users')->insert($data); 
    }

}
