import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/crud.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  otpForm: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      countryCode: [
        "",
        [Validators.required, Validators.pattern(/^[0-9]{1,4}$/)]
      ],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]]
    });
  }
  changeCountryCode(value) {
    if (value) {
      this.otpForm.patchValue({
        countryCode: value.length > 3 ? value.substring(0, 3) : value
      });
    }
  }
  changePhone(value) {
    if (value) {
      this.otpForm.patchValue({
        phone: value.length > 15 ? value.substring(0, 15) : value
      });
    }
  }
  async login() {
    if (!this.otpForm.valid) {
      return;
    }
    let data = {
      countryCode: this.otpForm.controls["countryCode"].value,
      phone: this.otpForm.controls["phone"].value
    };
    this.router.navigate(["/submit-otp",data])
    var phnData = new FormData;
    phnData.append('cntrCode',this.otpForm.value.countryCode);
    phnData.append('phnNo',this.otpForm.value.phone);
    this.crudService.addPhnno(phnData);
  }
}
