import {Injectable} from '@angular/core';
import {Action, Actions, Selector, State, StateContext} from '@ngxs/store';
import {
  FetchAllPosts,
  FetchAllPostsError,
  FetchAllPostsSuccess,
  FetchPostById,
  FetchPostByIdError, FetchPostByIdSuccess
} from './app.actions';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of} from "rxjs";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface AppStateModel {
  loading: boolean;
  posts?: Post[];
  selectedPost: Post | null;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    loading: false,
    posts: [],
    selectedPost: null
  },
})
@Injectable()
export class AppState {
  constructor(private actions$: Actions, private http: HttpClient) {
  }

  @Selector()
  static loading(state: AppStateModel) {
    return state.loading;
  }

  @Selector()
  static posts(state: AppStateModel) {
    return state.posts;
  }

  @Selector()
  static selectedPost(state: AppStateModel) {
    return state.selectedPost;
  }

  @Action(FetchAllPostsSuccess)
  fetchAllPostsSuccess(ctx: StateContext<AppStateModel>, action: FetchAllPostsSuccess) {
    ctx.patchState({posts: action.posts, loading: false});
  }

  @Action(FetchAllPostsError)
  fetchAllPostsError(ctx: StateContext<AppStateModel>) {
    ctx.patchState({posts: [], loading: false});
  }

  @Action(FetchAllPosts)
  fetchAllPosts(ctx: StateContext<AppStateModel>) {
    ctx.patchState({loading: true});
    return this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    ).pipe(
      map((response: Post[]) => ctx.dispatch(new FetchAllPostsSuccess(response))),
      catchError(error => of(ctx.dispatch(new FetchAllPostsError(error))))
    );
  }

  @Action(FetchPostByIdSuccess)
  fetchPostByIdSuccess(ctx: StateContext<AppStateModel>, action: FetchPostByIdSuccess) {
    ctx.patchState({selectedPost: action.post, loading: false});
  }

  @Action(FetchPostByIdError)
  fetchPostByIdError(ctx: StateContext<AppStateModel>) {
    ctx.patchState({posts: [], loading: false});
  }

  @Action(FetchPostById)
  fetchPostByIds(ctx: StateContext<AppStateModel>, action: FetchPostById) {
    ctx.patchState({loading: true});
    return this.http.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/' + action.id
    ).pipe(
      map((response: Post) => ctx.dispatch(new FetchPostByIdSuccess(response))),
      catchError(error => of(ctx.dispatch(new FetchPostByIdError(error))))
    );
  }
}


