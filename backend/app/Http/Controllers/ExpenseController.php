<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Redirect;
use DB;
use App\UserManagement;
use App\ExpenseManagement;
use Illuminate\Support\Facades\Auth;




class ExpenseController extends Controller
{

    public function __construct(){
        auth()->setDefaultDriver('api');
    }
     public function getExpenseData(Request $request){
        if($request->get('userId')!=null){
            $ex=Expense::where('userId',$request->get('userId'))->where('id',$request->get('itemId'))->first();
            $response = array('status'=> 'success', 'list'=>$ex);
        }else{
            $response = array('status'=> 'Error', 'message'=>'User not loged in');
        }
        
        return $response;
     }

    public function editExpense(Request $request){
        Validator::make($request->all(), [
            'expenseTitle' => ['required','string' ,'max:255'],
            'description' => ['required','string', 'max:255'],
            'date' => ['required','string', 'max:255'],
            'amount' => ['required','int', 'max:100']
        ])->validate();  
        $amount=$request->amount;
        $title=$request->expenseTitle;
        $date=$request->date;
        $category=$request->category;
        $description=$request->description;
        $userId=$request->userId;
        Expense::where('id',$request->itemId)->update([
            'date'=>$date,
            'amount'=>$amount,
            'title'=>$title,
            'description'=>$description
        ]);
        $response = array('status'=> 'success', 'message'=>'Expense added to the list.');
        return $response;    }
    
    public function deleteExpense(Request $request){
        // dd($request->get('id'));
        if($request->get('userId')!=null){
            Expense::find($request->get('id'))->delete();
            $response ='success';
        }else{
            $response = 'Error';
        }
        
        return json_encode($response);
    }
    
    public function getCategories(){
        $categories=Category::get();
        $response = array('status'=> 'success', 'categoryList'=>$categories);
        return $response;
    }

    public function getExpenseAndUser(Request $request){
        $userId=$request->get('userId');
        if($userId!=null){
            $es=Expense::where('userId',$userId)->get();
            $result=array();
            $cat=array();
            $cost=0.0;
            foreach($es as $e){
                $cat_e=Category::where('id',$e->category)->first();
                $e->category=$cat_e->name;
                $cost+=$e->amount;
                $e->cost=$cost;
                array_push($result,$e);
            }
            $user=User::where('id',$userId)->first();
            $response = array('status'=> 'success', 'list'=>$result,'user'=>$user);
        }else{
            $response = array('status'=> 'Error', 'message'=>'User not loged in');
        }
        
        return $response;
    }
    
    public function addExpense(Request $request)
    {
        Validator::make($request->all(), [
            'expenseTitle' => ['required','string' ,'max:255'],
            'description' => ['required','string', 'max:255'],
            'date' => ['required','date'],
            'amount' => ['required','between:0,299.99']
        ])->validate();  
        $userId = $request->get('userId');
        $title = $request->get('expenseTitle');
        $desc = $request->get('description');
        $category=$request->get('category');
        $categoryId=Category::where('name',$category)->first();
        // dd($categoryId->id);
        $date = str_replace('/', '-', $request->get('date'));
        $date = date('Y-m-d', strtotime($date));
        $amount = $request->get('amount');
        // dd($request->get('userId'));
        
        Expense::create([
            'title'=>$title,
            'amount'=>$amount,
            'description'=>$desc,
            'date'=>$date,
            'category'=>$categoryId->id,
            'userId'=>$userId
        ]); 
        $response = array('status'=> 'success', 'message'=>'Expense added to the list.');
        return $response;
    }

    public function getUserExpenseList(Request $request){
        if($request->get('userId')!=null){
            $es=Expense::where('userId',$request->get('userId'))->get();
            $result=array();
            $cat=array();
            $cost=0.0;
            foreach($es as $e){
                $cat_e=Category::where('id',$e->category)->first();
                $e->category=$cat_e->name;
                $cost+=$e->amount;
                $e->cost=$cost;
                array_push($result,$e);
            }
            // dd($cat);
            $response = array('status'=> 'success', 'list'=>$result);
        }else{
            $response = array('status'=> 'Error', 'message'=>'User not loged in');
        }
        
        return $response;
    }
}
