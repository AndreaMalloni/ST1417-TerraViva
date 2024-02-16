import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {environment} from "../../../environments/environment.development";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})

export class LoginModalComponent {
  constructor(private authService: AuthenticationService) { }

  formData: any = {};

  onSubmit() {

    this.authService.login(this.formData).subscribe(
      response => {
        environment.token = response.token;
        environment.username = response.username;
      },
      error => {
        console.error(error);
      }
    );
  }
}
