import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable,of, from } from 'rxjs';
import {Complaints} from "../complaints.model";
import { ComplaintsService } from '../complaints.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit {
  complaints: Observable<Complaints[]>
  constructor(private service: ComplaintsService, private auth: AuthService) { }

  ngOnInit() {
    this.complaints = this.service.getComplaints()
    console.log(this);
  }

  delete(id: string){
    this.service.delete(id);
  }

}
