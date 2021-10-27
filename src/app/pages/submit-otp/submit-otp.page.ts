import { StatusService } from 'src/app/providers/status/status.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/service/crud.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
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
  PhoneNumber:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private commonPopover: CommonPopoverService,
    private networkConnection: NetworkConnectionService,
    private keystore: StorageProvider,
    private StatusService: StatusService
  ) { }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otp: ["", [Validators.required, Validators.pattern(/^[0-9]{4,4}$/)]]
    });
    this.getNumber();
  }
  async getNumber(){
    this.PhoneNumber = await this.keystore.get('PhoneNumber')
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
    await this.StatusService.resendOtp(this.PhoneNumber);
    this.commonPopover.loaderDismiss();
  }
  async submitOTP() {
    if (this.networkConnection.isOffline()) {
      return this.networkConnection.isConnectionMessage();
    }
    if (!this.otpForm.valid) {
      return;
    }

    await this.commonPopover.loaderPresent("Verifying OTP");
    // Verify OTP Method
    this.StatusService.verifyOtp(this.PhoneNumber, this.otpForm.controls["otp"].value).then(res=> {
      if(res.type == "success")
      {
        this.keystore.set("isAuthenticated", true);
        this.commonPopover.loaderDismiss();
        this.router.navigate(["/select-role"]);
      }else{
        this.commonPopover.loaderDismiss();
        alert("Incorrect OTP");
      }
    })
  }
  ionViewWillLeave() {
    clearInterval(this.time);
  }
}
