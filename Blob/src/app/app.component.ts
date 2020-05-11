import { Component, OnInit } from '@angular/core';
import { TitleService } from './title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'Blob';

  get Title() {
    return this.titleService.Title;
  }

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.Title = 'Title';
  }
}
