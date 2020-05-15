import { Component, OnInit } from '@angular/core';
import { TitleService } from './title.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'Blob';

  get HideUiShell(): boolean {
    return this.authService.isAuthenticated;
  }

  get Title() {
    return this.titleService.Title;
  }

  constructor(private titleService: TitleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.titleService.Title = 'Title';
  }

  signOut(): void
  {
    this.authService.signOut();
  }
}
