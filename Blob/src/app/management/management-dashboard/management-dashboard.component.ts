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
import { IAdress } from 'src/app/interfaces/iadress';

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
  isSavingLocation: boolean = false;
  isSavingUser: boolean = false;
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
      id: new FormControl(0, Validators.required),
    });

    this.getAllLocations();
    this.getAllUsers();
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

  getAllUsers() {
    this.isUserLoading = true;
    this.managemantService.getAllUsers().subscribe(
      (data) => {
        this.listOfUsers = data;
        this.listOfDisplayUsers = data;

        this.isUserLoading = false;
      },
      (error) => {
        this.isUserLoading = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Laden der Benutzer ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }

  listOfUsers: IUserItem[] = [];
  listOfDisplayUsers: IUserItem[] = [];

  listOfLocations: ILocationItem[] = [];
  listOfDisplayLocations: ILocationItem[] = [];

  /********************************************
   ** Daten behandeln                        **
   ********************************************/

  changeLocation(id: number): void {
    var locations: ILocationItem[] = this.listOfLocations.filter(
      (item: ILocationItem) => item.id == id
    );

    var location:ILocationItem = locations[0];
    
    this.addLocationForm.controls['name'].setValue(location.name);
    this.addLocationForm.controls['street'].setValue(location.address.street);
    this.addLocationForm.controls['zip'].setValue(location.address.zip);
    this.addLocationForm.controls['city'].setValue(location.address.city);
    this.addLocationForm.controls['id'].setValue(location.id);

    this.isLocationPopupVisible = true;
  }

  deleteLocation(id: number): void {
    this.isLocationLoading = true;

    this.managemantService.deleteLocation(id).subscribe(
      (data) => {
        this.getAllLocations();
      },
      (error) => {
        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Löschen des Standortes ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }

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
/*     this.addUser({
      firstname: this.addUserForm.get('firstname').value,
      lastname: this.addUserForm.get('lastname').value,
      password: this.addUserForm.get('password').value,
    }); */
  }

  showLocationPopup(): void {
    this.addLocationForm.controls['id'].setValue(0);
    this.isLocationPopupVisible = true;
  }
  handleLocationPopupOk(): void {
    this.isLocationPopupVisible = false;
  }
  handleLocationPopupCancel(): void {
    this.isLocationPopupVisible = false;
  }
  submitLocationAddForm(): void {
    if (this.addLocationForm.controls['id'].value == 0) {
      this.addNewLocation();
    } else {
      this.updateLocation(this.addLocationForm.controls['id'].value);
    }
  }

  addNewLocation() {
    this.isSavingLocation = true;
    var address: IAdress = {
      id: 0,
      street: this.addLocationForm.controls['street'].value,
      zip: this.addLocationForm.controls['zip'].value,
      city: this.addLocationForm.controls['city'].value,
    };
    var newLocationItem: ILocationItem = {
      id: 0,
      name: this.addLocationForm.controls["name"].value,
      address: address,
    };

    this.managemantService.createLocation(newLocationItem).subscribe(
      (data) => {
        console.log(data);
        this.isLocationPopupVisible = false;
        this.isSavingLocation = false;
        this.isLocationLoading = true;
        this.getAllLocations();
      },
      (error) => {
        this.isSavingLocation = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Anlegen des Standortes ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }

  updateLocation(id: number) {
    this.isSavingLocation = true;

    var locations: ILocationItem[] = this.listOfLocations.filter(
      (item: ILocationItem) => item.id == id
    );

    var location:ILocationItem = locations[0];

    var address: IAdress = {
      id: location.address.id,
      street: this.addLocationForm.controls['street'].value,
      zip: this.addLocationForm.controls['zip'].value,
      city: this.addLocationForm.controls['city'].value,
    };

    var newLocationItem: ILocationItem = {
      id: id,
      name: this.addLocationForm.controls['name'].value,
      address: address,
    };
    
    this.managemantService.updateLocations([newLocationItem]).subscribe(
      (data) => {
        console.log(data);
        
        this.isLocationLoading = true;
        this.isLocationPopupVisible = false;
        this.isSavingLocation = false;
        this.getAllLocations();
      },
      (error) => {
        this.isSavingLocation = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Bearbeiten des Standortes ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }
}
