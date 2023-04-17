import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  doSignup() {
    this.authService.register(this.signupForm.value).subscribe();
  }

}
