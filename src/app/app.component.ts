import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, 'Taka');
const ANOTHER_USER: User = new User(2, 'John');

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // comments = COMMENTS;
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments');
    this.comments$ = this.commentsRef.valueChanges();
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment(this.currentUser, comment));
      this.comment = '';
    }
  }

}
