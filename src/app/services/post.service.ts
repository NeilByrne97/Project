import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
//import { Stream } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
    getPostsData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/posts");
    }

    // When adding put it in post-create.component.ts, post.model.ts, post.service.ts and server.js/app.post
  addPost(title: String, name: String, number:number, password:String, email:String): Observable<any> {
    const post: Post = {title: title, name: name, password: password, number: number, email: email};
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }

  getPost(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/"+id);
  }

  updatePost(id:String, title: String, name: String, password:String, number:number, email:String): Observable<any> {
    const post: Post = {title: title, name: name, password: password, number: number, email: email};
  return this.http.put("http://localhost:8081/api/posts/"+id, post);
  }
}
