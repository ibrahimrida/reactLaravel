<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

class ExpenseManagement extends Model
{
    public function getCategoryList(){
        $record = DB::table('category')
                        ->select('*')
                        ->get();
                        
        return $record;
    }

    public function addExpense($data){
        DB::table('expenses')->insert($data);  
    }

    public function userExpenseList($user_id){
        return DB::table('expenses')
                        ->select('expenses.id','expenses.title','expenses.amount','expenses.category', 'expenses.date', 'expenses.added_on')
                        ->where('expenses.userId', '=', $user_id)
                        ->get();  
    }
}
