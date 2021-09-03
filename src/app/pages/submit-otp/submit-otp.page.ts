import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { OtpService } from "src/app/providers/otp/otp.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { StorageProvider } from "src/app/providers/storage/storage.service";

@Component({
  selector: "app-submit-otp",
  templateUrl: "./submit-otp.page.html",
  styleUrls: ["./submit-otp.page.scss"]
})
export class SubmitOtpPage implements OnInit {
  title: string = "Enter OTP";
  otp: number;
  timer: number = 30;
  time = setInterval(() => {
    this.timer -= 1;
  }, 1000);
  otpForm: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private otpService: OtpService,
    private commonPopover: CommonPopoverService,
    private networkConnection: NetworkConnectionService,
    private router: Router,
    private keystore: StorageProvider
  ) {}

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otp: ["", [Validators.required, Validators.pattern(/^[0-9]{4,4}$/)]]
    });
  }
  changeOTP(value) {
    if (value) {
      this.otpForm.patchValue({
        otp: value.length > 4 ? value.substring(0, 4) : value
      });
    }
  }
  async resendOTP() {
    if (this.timer > 0) {
      return;
    }
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    await this.commonPopover.loaderPresent("Resending OTP");
    this.otpService
      .sendOTP(this.route.snapshot.paramMap["params"], "true")
      .then(data => {
        this.commonPopover.toastPopOver("OTP resend to your number.");
        this.timer = 30;
        this.commonPopover.loaderDismiss();
      })
      .catch(err => {
        this.commonPopover.loaderDismiss();
      });
  }
  async submitOTP() {
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    if (!this.otpForm.valid) {
      return;
    }
    let data = {
      countryCode: this.route.snapshot.paramMap.get("countryCode"),
      phone: this.route.snapshot.paramMap.get("phone"),
      otp: parseInt(this.otpForm.controls["otp"].value)
    };
    await this.commonPopover.loaderPresent("Verifying OTP");
    this.otpService
      .verifyOTP(data)
      .then(res => {
        this.keystore.set("isAuthenticated", true);
        this.commonPopover.loaderDismiss();
        if (res.isServiceRoleSelected) {
          this.router.navigate(["/home/map"]);
        } else {
          this.router.navigate(["/select-role"]);
        }
      })
      .catch(err => {
        this.commonPopover.loaderDismiss();
      });
    // this.router.navigate(["/select-role"]);
  }
  ionViewWillLeave() {
    clearInterval(this.time);
  }
}
