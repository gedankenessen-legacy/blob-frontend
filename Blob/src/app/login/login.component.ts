import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    this.authService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
      (data) => {
        this.authService.willExpiresIn = new Date();
        this.authService.willExpiresIn.setSeconds(data.expires_in);

        this.authService.setToken(data.access_token);
  
        this.router.navigate(['product']);
      },
      (error) => {}
    );
  }
}
