import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  serviceRole: string;
  Volunteer = "Volunteer";
  Distressed = "Distressed";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.serviceRole = this.route.snapshot.paramMap.get("serviceRole");
  }
  saveUserInfo(){
    this.router.navigate(['/home/map',{ serviceRole:this.serviceRole }]);
  }

}
