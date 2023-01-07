import { Component, OnInit } from '@angular/core';
import { FetchAllPosts } from '../../state/app/app.actions';
import { Select, Store } from '@ngxs/store';
import { AppState, Post } from '../../state/app/app.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(AppState.loading) loading$?: Observable<boolean>;
  @Select(AppState.posts) posts?: Observable<Post[]>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.store.dispatch(new FetchAllPosts());
    console.log(this.posts);
  }
  viewPost(id: any) {
    console.log(id);
    this.router.navigate([id]);
  }
}
