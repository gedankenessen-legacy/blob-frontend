import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ILocationItem } from 'src/app/interfaces/manage/ILocationItem';
import { IAdress } from 'src/app/interfaces/iadress';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-management-dashboard-locations',
  templateUrl: './management-dashboard-locations.component.html',
  styleUrls: ['./management-dashboard-locations.component.less']
})
export class ManagementDashboardLocationsComponent implements OnInit {
  isLocationPopupVisible: boolean = false;
  isLocationLoading: boolean = false;
  isSavingLocation: boolean = false;
  addLocationForm: FormGroup;

  /***************************************
   ** Daten der Standorte               **
   ***************************************/
  listOfLocations: ILocationItem[] = [];
  listOfDisplayLocations: ILocationItem[] = [];

  constructor(private modal:NzModalService, private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {
    this.addLocationForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      id: new FormControl(0, Validators.required),
    });

    this.getAllLocations();
  }

  /***************************************
   ** Laden aller Standorte             **
   ***************************************/
  getAllLocations() {
    this.isLocationLoading = true;
    this.locationService.getAllLocations().subscribe(
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

  /***************************************
   ** Ändern eines Standortes           **
   ***************************************/
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

  /***************************************
   ** Löschen eines Standortes          **
   ***************************************/
  deleteLocation(id: number): void {
    this.isLocationLoading = true;

    this.locationService.deleteLocation(id).subscribe(
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

  /***************************************
   ** Hinzufügen eines Standortes       **
   ***************************************/
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

    this.locationService.createLocation(newLocationItem).subscribe(
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

  /***************************************
   ** Änderen eines Standortes          **
   ***************************************/
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
    
    this.locationService.updateLocations([newLocationItem]).subscribe(
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
