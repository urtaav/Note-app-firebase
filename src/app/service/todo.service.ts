import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs:AngularFirestore,private _toastr: ToastrService) { }

  loadTodos(id:string){
    return this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    );
  }

  saveTodo(id:string,data){
    this.afs.collection('categories').doc(id).collection('todos').add(data).then(ref => {
      this.afs.doc('categories/' + id).update({todoCount:firestore.FieldValue.increment(1)});
      this._toastr.success('New Todo Saved successfully');
    });
  }

  updateTodo(catId:string,id:string,updateData:string){
    this.afs.collection('categories').doc(catId).collection('todos').doc(id).update({todo:updateData}).then(()=>{
      this._toastr.success('Update successfully');
    });
  }

  deleteTodo(catId:string, id:string){
   this.afs.collection('categories').doc(catId).collection('todos').doc(id).delete().then( () => {

    this.afs.doc('categories/' + catId).update({todoCount: firestore.FieldValue.increment(-1)});
      this._toastr.error('Delete Successfully');
    });
  }

  markComplete(catId:string, todoId:string){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({isCompleted:true}).then(()=>{
      this._toastr.info('Todo Marked  Completed');
    });
  }
  markUnComplete(catId:string, todoId:string){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({isCompleted:false}).then(()=>{
      this._toastr.warning('Todo Marked  unCompleted');
    });
  }
}
