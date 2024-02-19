import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})

export class LoginModalComponent {

  constructor(private authService: AuthenticationService) { }

  loggedIn = this.authService.checkLogin()
  formData: any = {};
  userInfo!: { username: string; role: string; };

  onSubmit() {
    this.formData.password = sha256(this.formData.password).toString();
    this.authService.login(this.formData).subscribe(
      response => {
        this.userInfo = this.authService.getInfo(response.token);
        sessionStorage.setItem("token", response.token)
        sessionStorage.setItem("username", this.userInfo.username)
        this.loggedIn = this.authService.checkLogin()
      },
      error => {
        console.error(error);
      }
    );
  }

  onLogout() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    this.loggedIn = this.authService.checkLogin()
  }

  protected readonly sessionStorage = sessionStorage;
}
