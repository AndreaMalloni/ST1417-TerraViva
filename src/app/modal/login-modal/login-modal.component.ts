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
  userInfo!: { username: string; role: string; };

  onSubmit() {
    console.log("test")
    this.authService.login(this.formData).subscribe(
      response => {
        this.userInfo = this.authService.getInfo(response.token);
        sessionStorage.setItem("token", response.token)
        sessionStorage.setItem("username", this.userInfo.username)
      },
      error => {
        console.error(error);
      }
    );
  }
}
