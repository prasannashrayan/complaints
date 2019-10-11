import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ComplaintsService} from "../complaints.service";
import {Complaints} from "../complaints.model";

@Component({
  selector: 'app-complaints-detail',
  templateUrl: './complaints-detail.component.html',
  styleUrls: ['./complaints-detail.component.css']
})
export class ComplaintsDetailComponent implements OnInit {

  complaints: Complaints
  constructor(private route: ActivatedRoute, private service: ComplaintsService) { }

  ngOnInit() {
    this.getComplaints()
  }
  getComplaints(){
    const id = this.route.snapshot.paramMap.get("id")
    return this.service.getComplaintsData(id).subscribe(data => this.complaints = data)
  }
}
