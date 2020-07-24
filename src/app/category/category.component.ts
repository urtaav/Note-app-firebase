import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  color: Array<any> = ['#e7845e','#fc0184','#f6b93f','#9224a7','#28c898','#aad450','#aad450','#026467','#fefefe','#928779','#d4d2a5','#FCDEBE','#90A583','#B26E63','#C6CAED'];
  categories:Array<object>;
  categoryName: string = '';
  catId: string = '';
  dataStatus:string = 'Add';

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this._categoryService.loadCategories().subscribe(val => {
      console.log("getAllCategories",val);
      this.categories = val;
    })
  }

  onSubmit(f:NgForm){

    if(this.dataStatus === 'Add'){
      let randomNumber = Math.floor(Math.random() * this.color.length);

      let todoCategory = {
        category: f.value.categoryName,
        colorCode:this.color[randomNumber],
        todoCount:0
      }
  
      this._categoryService.saveCategory(todoCategory);

    }else if(this.dataStatus === 'Edit'){

      this._categoryService.updateCategory(this.catId,f.value.categoryName);
      f.resetForm();
      this.dataStatus = 'Add';
      
    }else{
    }
  }

  onEdit(category: string,id:string){
    this.dataStatus = 'Edit';
    this.categoryName = category;//settear al input
    this.catId = id;
  }

  onDelete(id:string){
    this._categoryService.deleteCategory(id);
  }
}


