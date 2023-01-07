import { Component } from '@angular/core';
import { AppState, Post } from '../../state/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchPostById } from '../../state/app/app.actions';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  public id: string;
  @Select(AppState.selectedPost) post?: Observable<Post>;
  @Select(AppState.loading) loading?: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(new FetchPostById(parseInt(this.id) || 1));
  }
}
