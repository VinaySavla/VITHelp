import { StatusService } from 'src/app/providers/status/status.service';
import { CommonPopoverService } from './../../../providers/common-popover/common-popover.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageProvider } from './../../../providers/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { constants } from 'src/app/constants/constants';
import { GoogleMapsService } from 'src/app/providers/google-maps/google-maps.service';

@Component({
  selector: 'app-distressed',
  templateUrl: './distressed.page.html',
  styleUrls: ['./distressed.page.scss'],
})
export class DistressedPage implements OnInit {
  ionicForm: FormGroup;
  serviceRole: 'Volunteer' | 'Distressed';
  DistressForm: any;
  PhoneNumber: any;
  countryCode: any;
  user: any;
  selectedRadio: any;
  checkBoxList: any = constants.checkBoxList;
  HelpType:any;
  constructor(
    private keystore: StorageProvider,
    private router: Router, 
    private formBuilder: FormBuilder,
    private StatusService: StatusService,
    private googleService: GoogleMapsService,
    private commonPopover: CommonPopoverService
  ) { }

 

  ngOnInit() {
    this.keystore.get("serviceRole").then(user => {
      this.serviceRole = user;
    });
    this.keystore.get("PhoneNumber").then(PhoneNumber => {
      // this.DistressForm.value.phone= PhoneNumber;
      this.PhoneNumber = PhoneNumber;
    });
    this.keystore.get("countryCode").then(countryCode => {
      // this.DistressForm.value.countryCode= countryCode;
      this.countryCode = countryCode;
    });
    this.fetchUser();
  }
  
  fetchUser(){
    this.keystore.get("user").then(user => {
      this.user = user;
      this.DistressForm = this.formBuilder.group({
        name: [this.user.Name || '', [Validators.required]],
        countryCode: [
          parseInt(this.user.CountryCode) || '',
          [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
        ],
        phone: [
          this.user.PhoneNumber||'',
          [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
        ],
        age: [this.user.Age || '', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]],
        address: this.formBuilder.group({
          lat: ['', [Validators.required]],
          lng: ['', [Validators.required]],
          formattedAddress: [
            '',
            [Validators.required]
          ]
        }),
        sosReason: ['', Validators.required]
      });
    }).catch(err =>{
      console.log(err);
    });
      
    }
    selectRadio(value) {
    this.selectedRadio = value;
    if(this.selectedRadio == "Food"){
      this.HelpType = 1;
    } else if( this.selectedRadio == "Clothing"){
      this.HelpType = 2;
    } else if( this.selectedRadio == "Shelter"){
      this.HelpType = 3;
    } else if(this.selectedRadio == "Medical"){
      this.HelpType = 4;
    }
  }
  raiseDistress(){

    const data = {
      UserId: this.user.Id,
      Name: this.DistressForm.controls.name.value,
      PhoneNumber: this.PhoneNumber,
      Age: this.DistressForm.controls.age.value,
      Address: this.DistressForm.value.address.formattedAddress,
      Lat: this.DistressForm.value.address.lat,
      Lng: this.DistressForm.value.address.lng,
      HelpTypeId: this.HelpType
    };
    this.commonPopover.loaderPresent("Raising Distress Alert");
    try{
      this.StatusService.raiseCase(data).then(res =>{
        this.commonPopover.loaderDismiss();
      })
    }
    catch(error){
      console.log(error);
      this.commonPopover.loaderDismiss();
    }
  }


  async getCurrentPosition() {
    await this.commonPopover.loaderPresent('Fetching current location');
    const address = await this.googleService.getCurrentPosition();
    this.commonPopover.loaderDismiss();
    if (!_.isEmpty(address)) {
      // Set value of lat-lng,formatted_address
      this.DistressForm.patchValue({
        address: {
          lat: address.lat,
          lng: address.lng,
          formattedAddress: address.formattedAddress
        }
      });
    }
  }
}
