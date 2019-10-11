import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase/app";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null
  constructor(private auth: AngularFireAuth) { 
    this.auth.authState.subscribe(data => this.authState = data)
  }

  get authenticated(): boolean{
    return this.authState !== null
  }

  get currentUserId(): string{
    return this.authenticated ? this.authState.uid : null
  }
  login(){
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  // loginFb(){
  //   this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  // }
  
  logout(){
    this.auth.auth.signOut();
  }
  // logoutFb(){
  //   this.auth.auth.signOut();
  // }
  getLoggedInUser(){
    return this.auth.authState;
  }
}
