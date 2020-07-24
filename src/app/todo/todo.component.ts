import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  catId:string;
  todos:Array<object>;
  todoValue:string;
  dataStatus:string = 'Add';
  todoId:string;

  constructor(private _todoService:TodoService,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.catId = this.activatedRouter.snapshot.paramMap.get('id');
    this._todoService.loadTodos(this.catId).subscribe( resp => {
      this.todos = resp;
    });
  }

  onSubmit(f:NgForm){
    if(this.dataStatus === 'Add'){

      let todo = {
        todo: f.value.todoText,
        isCompleted: false
      }

      this._todoService.saveTodo(this.catId,todo);
      f.resetForm();

    }else{
      this._todoService.updateTodo(this.catId,this.todoId,f.value.todoText);
      f.resetForm();
      this.dataStatus = 'Add';
    }

  }
  onEdit(todo: string,id:string){
    this.todoValue = todo;
    this.dataStatus = 'Edit';
    this.todoId = id;
  }

  onDelete(id:string){
    this._todoService.deleteTodo(this.catId,id);
  }

  completeTodo(todoId:string){
    this._todoService.markComplete(this.catId,todoId);
  }
  uncompleteTodo(todoId:string){
    this._todoService.markUnComplete(this.catId,todoId);
  }
}
