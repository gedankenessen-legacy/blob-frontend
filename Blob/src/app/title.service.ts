import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private _title: string;

  constructor() {}

  /**
   * Title
   */
  public get Title(): string {
    return this._title;
  }

  /**
   * Title
   */
  public set Title(newTitle: string) {
    this._title = newTitle;
  }
}
