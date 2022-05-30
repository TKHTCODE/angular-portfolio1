import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, 'Taka');
const ANOTHER_USER: User = new User(2, 'John');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'Hey'),
  new Comment(ANOTHER_USER, 'How are you doing?'),
  new Comment(CURRENT_USER, 'Yeah,'),
  new Comment(CURRENT_USER, 'I am doing good.')
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
  }

  addComment(comment: string): void {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }

}
