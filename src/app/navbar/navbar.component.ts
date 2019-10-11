import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getLoggedInUser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

}
