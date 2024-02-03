import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {environment} from "../../environments/environment.development";

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
    const username = (<HTMLInputElement>document.getElementById("inputUsername")).value;
    const password = (<HTMLInputElement>document.getElementById("inputPassword")).value;

    this.authService.login(username, password).subscribe(
      response => {
        environment.token = response.token
      },
      error => {
        console.error(error);
      }
    );
  }

}
