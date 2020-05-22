import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ILocationItem } from 'src/app/interfaces/manage/ILocationItem';
import { IUserItem } from 'src/app/interfaces/manage/IUserItem';

import { TitleService } from 'src/app/title.service';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.less'],
})
export class ManagementDashboardComponent implements OnInit {
  isLocationPopupVisible: boolean = false;
  isUserPopupVisible: boolean = false;
  addLocationForm: FormGroup;
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder, private titleService: TitleService) {
    this.titleService.Title = 'Verwaltung';
  }

  ngOnInit(): void {
    // Add user
    this.addUserForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
    });

    // Add location
    this.addLocationForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    });
  }

  placeholderUsers: IUserItem[] = [
    {
      id: 1,
      firstname: 'Matze',
      lastname: 'Müller',
      username: 'mmüller3',
    },
    {
      id: 2,
      firstname: 'Beate',
      lastname: 'Fuchs',
      username: 'bfuchs1',
    },
    {
      id: 3,
      firstname: 'Igor',
      lastname: 'Vostok',
      username: 'ivostok1',
    },
  ];

  placeholderLocations: ILocationItem[] = [
    {
      id: 1,
      name: 'Hauptquartier',
      street: 'Landauerstraße 20',
      zip: '77151',
      city: 'Berlin',
    },
    {
      id: 2,
      name: 'Zweites Lager',
      street: 'Hauptstraße 71a',
      zip: '34125',
      city: 'München',
    },
    {
      id: 3,
      name: 'Auslandserweiterung',
      street: 'Bastil 5',
      zip: '75000',
      city: 'Paris',
    },
  ];

  /********************************************
   ** Daten behandeln                        **
   ********************************************/

  fetchUsers(): IUserItem[] {
    return this.placeholderUsers;
  }

  fetchLocations(): ILocationItem[] {
    return this.placeholderLocations;
  }

  changeLocation(): void {
    // Change submit to POST request
    // Fill popup with data
    // Make location popup visible
  }
  deleteLocation(): void {}

  /********************************************
   ** Popup aktionen                          **
   ********************************************/

  showUserPopup(): void {
    this.isUserPopupVisible = true;
  }
  handleUserPopupOk(): void {
    this.isUserPopupVisible = false;
  }
  handleUserPopupCancel(): void {
    this.isUserPopupVisible = false;
  }

  submitUserAddForm(): void {}

  showLocationPopup(): void {
    this.isLocationPopupVisible = true;
  }
  handleLocationPopupOk(): void {
    this.isLocationPopupVisible = false;
  }
  handleLocationPopupCancel(): void {
    this.isLocationPopupVisible = false;
  }
  submitLocationAddForm(): void {}
}
