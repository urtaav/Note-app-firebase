import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:AngularFirestore,private _toastr: ToastrService) { }

  loadCategories(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }

  saveCategory(data){
    console.log("saveCategory");
    this.afs.collection('categories').add(data).then(ref => {
      this._toastr.success('New Category Saved successfully');
    });
  }

  updateCategory(id:string, updateData){
    this.afs.doc('categories/' + id).update({category:updateData}).then( () => {
      console.log("update success");
      this._toastr.success('Update successfully');
    });
  }
  
  deleteCategory(id:string){
    this.afs.doc('categories/' + id).delete().then( () => {
      console.log("Category delete successfully");
      this._toastr.error('Category Delete successfully');
    });
  }
}
