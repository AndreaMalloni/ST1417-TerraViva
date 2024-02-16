import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {LoginModalComponent} from "../modal/login-modal/login-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LoginModalComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}
