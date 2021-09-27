import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
})
export class CertificatePage implements OnInit {
  user: any;
  contentHidden: boolean = true;
  

  @ViewChild ('content', {static:false}) el!: ElementRef;

  constructor(
    private keystore: StorageProvider
  ) { }

  ngOnInit() {
    this.keystore.get("user").then(user => this.user = user);
  }


 printDiv() {
			var divContents = document.getElementById("certificate").innerHTML;
			var a = window.open('', '', 'height=500, width=500');
			a.document.write(divContents);
      a.document.title = "Certificate";
			a.document.close();
			a.print();
		}
    
    showContent() {
      if (this.contentHidden) {
        this.contentHidden = false;
      }
      else {
        this.contentHidden = true;
      }
    }

}
