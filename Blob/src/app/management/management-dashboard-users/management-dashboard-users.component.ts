import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { MustMatch } from '../passwordValidation';
import { IUserItem } from 'src/app/interfaces/manage/IUserItem';
import { UserService } from '../user.service';

@Component({
  selector: 'app-management-dashboard-users',
  templateUrl: './management-dashboard-users.component.html',
  styleUrls: ['./management-dashboard-users.component.less']
})
export class ManagementDashboardUsersComponent implements OnInit {
  isUserPopupVisible: boolean = false;
  isUserLoading: boolean = false;
  isSavingUser: boolean = false;
  addUserForm: FormGroup;

  /***************************************
   ** Daten der Benutzer                **
   ***************************************/
  listOfUsers: IUserItem[] = [];
  listOfDisplayUsers: IUserItem[] = [];

  constructor(private modal:NzModalService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[#$^+=!*()@%&]).{1,30}$')])),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validator: MustMatch('password', 'passwordConfirm')
    }
    );

    this.getAllUsers();
  }

  /***************************************
   ** Laden aller Benutzer              **
   ***************************************/
  getAllUsers() {
    this.isUserLoading = true;
    this.userService.getAllUsers().subscribe(
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
    this.addNewUser()
  }

  /***************************************
   ** Hinzufügen eines Benutzers        **
   ***************************************/
  addNewUser() {
    this.isSavingUser = true;
    var newUserItem: IUserItem = {
      id: 0,
      firstName: this.addUserForm.controls['firstname'].value,
      lastName: this.addUserForm.controls['lastname'].value,
      userName: null,
      password: this.addUserForm.controls['password'].value,
    };
    delete newUserItem.id;

    this.userService.createUser(newUserItem).subscribe(
      (data) => {
        this.isUserPopupVisible = false;
        this.isSavingUser = false;
        this.isUserLoading = true;
        this.getAllUsers();
        this.addUserForm.reset();
      },
      (error) => {
        this.isSavingUser = false;

        this.modal.error({
          nzTitle: 'Fehler',
          nzContent: 'Beim Anlegen des Benutzers ist ein Fehler aufgetreten, bitte benachrichtigen Sie den Administrator.'
        });
      }
    );
  }
}
