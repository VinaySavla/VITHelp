import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { OtpService } from "src/app/providers/otp/otp.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  otpForm: any;
  constructor(
    private router: Router,
    private commonPopover: CommonPopoverService,
    private networkConnection: NetworkConnectionService,
    private otpService: OtpService,
    private formBuilder: FormBuilder,
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
    //TODO form validation and make body
    if (!this.otpForm.valid) {
      return;
    }
    let data = {
      countryCode: this.otpForm.controls["countryCode"].value,
      phone: this.otpForm.controls["phone"].value
    };
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    await this.commonPopover.loaderPresent("Sending OTP");
    this.otpService
      .sendOTP(data)
      .then(res => {
        this.commonPopover.loaderDismiss();
        this.commonPopover.toastPopOver("OTP sent to your number.");
        this.router.navigate(["/submit-otp",data]);
      })
      .catch(error => {
        this.commonPopover.loaderDismiss();
      });
    // this.router.navigate(["/submit-otp",data])
  }
}
