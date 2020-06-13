import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    this.isLoading = true;

    this.authService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
      (data) => {
        this.authService.willExpiresIn = new Date();
        this.authService.willExpiresIn.setSeconds(data.expires_in);

        this.authService.setToken(data.access_token);

        this.router.navigate(['product']);

        this.isLoading = false;
      },
      (error) => {

        if (error.error.error != null)
          console.error(`HTTP-Code: ${error.status}, Error: ${error.error.error}, Error Description: ${error.error.error_description}`);
        else
          console.error(`HTTP-Code: ${error.status}, Message: ${error.message}`);

        switch (error.status) {
          case 0:
            this.modalService.error({
              nzTitle: 'Fehler',
              nzContent: 'Beim Login ist es zu einem Fehler gekommen, bitte benachrichtigen Sie den Administrator.',
            });
            break;

          case 500:
            this.modalService.error({
              nzTitle: 'Fehler',
              nzContent: 'Beim Login ist es zu einem Fehler gekommen, bitte benachrichtigen Sie den Administrator.',
            });
            break;

          default:
            this.modalService.error({
              nzTitle: 'Fehler',
              nzContent: 'Benutzername oder Passwort inkorrekt.',
            });
            break;
        }

        this.isLoading = false;
      }
    );
  }
}
