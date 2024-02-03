import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})

export class LoginModalComponent {
  constructor(private authService: AuthenticationService) { }

  onSubmit() {
    // get the username and password from the form
    const username = (<HTMLInputElement>document.getElementById("inputUsername")).value;
    const password = (<HTMLInputElement>document.getElementById("inputPassword")).value;

    // call the login method of the auth service
    this.authService.login(username, password).subscribe(
      // handle the response
      response => {
        // do something with the response, e.g. store the token
        console.log(response);
      },
      // handle the error
      error => {
        // do something with the error, e.g. show a message
        console.error(error);
      }
    );
  }

}
