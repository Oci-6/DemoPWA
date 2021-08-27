import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  signIn(user: User){
    return this.http.post(this.URL + '/signin', user);
  }

  signUp(user: User){
    return this.http.post(this.URL + '/signup', user);
  }

  signInWithGoogle(user: User){
    return this.http.post(this.URL + '/signingoogle', user);
  }

}
