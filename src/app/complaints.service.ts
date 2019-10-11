import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Complaints } from './complaints.model';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  postsCollection: AngularFirestoreCollection<Complaints>
  complaintDoc: AngularFirestoreDocument<Complaints> 
  constructor(private firestore: AngularFirestore) { 
    this.postsCollection = this.firestore.collection('complaints', ref => ref.orderBy("published", "desc"))
  }

  getComplaints(){
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Complaints
        const id = a.payload.doc.id
        return {id, ...data}
      })
    }))
  }

  getComplaintsData(id: string){
    this.complaintDoc = this.firestore.doc<Complaints>(`complaint/${id}`)
    return this.complaintDoc.valueChanges()
  }

  create(data: Complaints){
    this.postsCollection.add(data);
  }
  getComplaint(id: string){
    return this.firestore.doc<Complaints>(`complaints/${id}`)
  }
  delete(id: string){
    return this.getComplaint(id).delete();
  }
  update(id: string, formData){
    return this.getComplaint(id).update(formData);
  }
}
