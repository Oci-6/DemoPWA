import { Component, NgZone, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser = new SocialUser;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService,
    private auth: UserService
  ) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      let usuario: User = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      this.auth.signInWithGoogle(usuario).subscribe(
        response => {
          console.log(response);
          localStorage.setItem('user', JSON.stringify(response));
        },
        error => {

        }
      );
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
