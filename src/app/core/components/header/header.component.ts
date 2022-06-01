import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authServise: AuthService
    ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user: firebase.User) => {
      this.isLogin = !!user;
    });
  }

  logout(): void {
    this.authServise.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
