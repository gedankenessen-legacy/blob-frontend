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
import { ManagementService } from '../management.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.less'],
})
export class ManagementDashboardComponent implements OnInit {
  isLocationPopupVisible: boolean = false;
  isUserPopupVisible: boolean = false;
  isLocationLoading: boolean = false;
  isUserLoading: boolean = false;
  addLocationForm: FormGroup;
  addUserForm: FormGroup;

  constructor(private modal:NzModalService, private fb: FormBuilder, private titleService: TitleService, private managemantService: ManagementService) {
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

    this.getAllLocations();
  }

  getAllLocations() {
    this.isLocationLoading = true;
    this.managemantService.getAllLocations().subscribe(
      (data) => {
        this.listOfLocations = data;
        this.listOfDisplayLocations = data;

        this.isLocationLoading = false;
      },
      (error) => {
        this.isLocationLoading = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Standorte ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }

  listOfUsers: IUserItem[] = [
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

  listOfLocations: ILocationItem[] = [];
  listOfDisplayLocations: ILocationItem[] = [];

  /********************************************
   ** Daten behandeln                        **
   ********************************************/

  // TODO: Send actual request
  addUser(user): void {
    console.log(user);
  }

  addLocation(location): void {
    console.log(location);
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

  submitUserAddForm(): void {
    // TODO: build username
    // TODO: validate input
    this.addUser({
      firstname: this.addUserForm.get('firstname').value,
      lastname: this.addUserForm.get('lastname').value,
      password: this.addUserForm.get('password').value,
    });
  }

  showLocationPopup(): void {
    this.isLocationPopupVisible = true;
  }
  handleLocationPopupOk(): void {
    this.isLocationPopupVisible = false;
  }
  handleLocationPopupCancel(): void {
    this.isLocationPopupVisible = false;
  }
  submitLocationAddForm(): void {
    // TODO: validate input
    this.addLocation({
      name: this.addLocationForm.get('name').value,
      street: this.addLocationForm.get('street').value,
      zip: this.addLocationForm.get('zip').value,
      city: this.addLocationForm.get('city').value,
    });
  }
}
