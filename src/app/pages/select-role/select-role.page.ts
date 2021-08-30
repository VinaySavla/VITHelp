import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.page.html',
  styleUrls: ['./select-role.page.scss'],
})
export class SelectRolePage implements OnInit {
  serviceRole = "Volunteer" || "Distressed";
  Volunteer = "Volunteer";
  Distressed = "Distressed";

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  setRole(Role){
    this.serviceRole=Role;
  }
  profilePage = () => {
    this.router.navigate(["/setup-profile",{ serviceRole:this.serviceRole }]);
  }
}