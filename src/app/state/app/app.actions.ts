import {Post} from "./app.state";

export class FetchAllPosts {
  static readonly type = '[App] Fetch All Posts';
}

export class FetchAllPostsSuccess {
  static readonly type = '[App] Fetch All Posts Success';
  constructor(public posts: Post[]) {}
}

export class FetchAllPostsError {
  static readonly type = '[App] Fetch All Posts Error';
  constructor(public error: any) {}
}

export class FetchPostById {
  static readonly type = '[App] Fetch Post By Id';

  constructor(public id: number) {}
}

export class FetchPostByIdSuccess {
  static readonly type = '[App] Fetch Post By Id Success';
  constructor(public post: Post) {}
}

export class FetchPostByIdError {
  static readonly type = '[App] Fetch Post By Id Error';
  constructor(public error: any) {}
}

