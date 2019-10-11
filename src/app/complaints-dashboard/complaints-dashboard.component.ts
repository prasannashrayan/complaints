import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ComplaintsService} from "../complaints.service";
import { Observable } from 'rxjs';
import {AngularFireStorage} from "@angular/fire/storage";
// import { url } from 'inspector';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-complaints-dashboard',
  templateUrl: './complaints-dashboard.component.html',
  styleUrls: ['./complaints-dashboard.component.css']
})
export class ComplaintsDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create Complaint";

  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  constructor(private auth: AuthService, private service: ComplaintsService, 
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  createComplaint(){
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId, 
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.service.create(data)
    this.title = "";
    this.content = "";
    this.buttonText = "Complaint Created!";
    setTimeout(() => (this.buttonText = "Create Complaint"),3000);
  }

  uploadImage(event){
    const file = event.target.files[0]
    const path = `complaints/${file.name}`
    if(file.type.split('/')[0] !== 'image'){
      return alert('only image files');
    }else{
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
      )
      .subscribe();
    }
  }
}
