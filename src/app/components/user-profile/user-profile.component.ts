import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  noDataText = 'Unable to find profile.';
  @Input() serviceRole: string;
  title = 'Profile';
  tempArray = new Array(8);
  isIndeterminate: boolean;
  ionicForm: FormGroup;
  masterCheck: boolean;
  selectedList = [];
  selectedRadio: any;
  isAllSelected = false;
  isLoading = false;
  userForm: any;
  userInfo: any;
  userReg:any;
  Volunteer = "Volunteer";
  Distressed = "Distressed";

  checkBoxList= [
    {
      value: "food",
      name: "Food",
      isChecked: false
    },
    {
      value: "clothing",
      name: "Clothing",
      isChecked: false
    },
    {
      value: "shelter",
      name: "Shelter",
      isChecked: false
    },
    {
      value: "medical",
      name: "Medical",
      isChecked: false
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      countryCode: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
      ],
      profession: ['', [Validators.required]],
      address: this.formBuilder.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
        formattedAddress: [
          '',
          [Validators.required]
        ]
      }),
      serviceRole: ['', [Validators.required]],
      supportList: [''],
      isServiceRoleSelected: [''],
      isUserServiceActive: [
        '',
        [Validators.required]
      ]
    });
  }

  

  /**
   * CheckBox
   * @param event
   */
  checkMaster(event) {
    setTimeout(() => {
      this.checkBoxList.forEach((obj: { isChecked: boolean }) => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  /**
   * Check box event
   */
  checkEvent() {
    const totalItems = this.checkBoxList.length;
    let checked = 0;
    this.checkBoxList.map((obj: { isChecked: any }) => {
      if (obj.isChecked) { checked++; }
    });
    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked === totalItems) {
      // If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      // If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  /**
   * Select radio
   * @param value
   */
  selectRadio(value) {
    this.selectedRadio = value;
  }

  /**
   * Save user info
   */
   saveUserInfo() {
    this.router.navigate(['/home/map',{ serviceRole:this.serviceRole }]);
    }

   
}
