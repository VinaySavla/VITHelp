import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { CrudService } from "src/app/service/crud.service";
import { CommonPopoverService } from "src/app/providers/common-popover/common-popover.service";
import { NetworkConnectionService } from "src/app/providers/network-connection/network-connection.service";
import { HttpClient, HttpClientModule} from "@angular/common/http";
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
  phnNo: any;
  array: any=[];
  time = setInterval(() => {
    this.timer -= 1;
  }, 1000);
  otpForm: any;
  constructor(
    private crudService: CrudService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private commonPopover: CommonPopoverService,
    private networkConnection: NetworkConnectionService,
    private keystore: StorageProvider
  ) {}

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otp: ["", [Validators.required, Validators.pattern(/^[0-9]{4,4}$/)]]
    });
    this.phnNo =this.keystore.get('phnNo');
    this.getPhnno();
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
    //TODO Resend otp Method
    this.commonPopover.loaderDismiss();
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
    //TODO Verify OTP Method
    //TODO if otp verified : this.keystore.set("isAuthenticated", true); to be added
    for (var i=0; i<=this.array.length; i++) {
      if (this.array[i] === this.phnNo) {
      alert("present");
      console.log("present");
    }
    else {
      alert("not present");
      console.log(" not present");
    }
  } 
  console.log(JSON.stringify(this.array));
    this.keystore.set("isAuthenticated", true);
    this.commonPopover.loaderDismiss();
    this.router.navigate(["/select-role"]);
  }
  getPhnno() {
    this.http.get<any>('http://covithelp.16mb.com/phnno.php').subscribe(data => {
      //var response = data;
      this.array = data;
      console.log(this.array);
    }, error => {
      console.log(error)
    })
  }
  

  ionViewWillLeave() {
    clearInterval(this.time);
  }
}
