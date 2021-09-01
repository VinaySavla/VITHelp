import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StorageProvider } from 'src/app/providers/storage/storage.service';
import { constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.page.html',
  styleUrls: ['./select-role.page.scss'],
})
export class SelectRolePage implements OnInit {
  serviceRole = "";
  isServiceRoleStored: boolean = false;
  storedRole: any = "";
  // volunteer = constants.enums.roles.SERVICE_PROVIDER;
  // distressed = constants.enums.roles.SERVICE_TAKER;
  volunteer="Volunteer"
  distressed="Distressed"

  constructor(
    private router: Router,
    private keystore: StorageProvider
  ) {}

  ngOnInit() {
  }
  setRole(Role){
    this.serviceRole=Role;
    this.keystore.set("User",this.serviceRole)
  }
  profilePage = () => {
    this.router.navigate(["/setup-profile",{ serviceRole:this.serviceRole }]);
  }
}