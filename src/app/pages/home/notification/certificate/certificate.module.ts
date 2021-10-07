import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonHeaderModule } from 'src/app/components/common-header/common-header.module';

import { IonicModule, IonLabel} from '@ionic/angular';

import { CertificatePageRoutingModule } from './certificate-routing.module';

import { CertificatePage } from './certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificatePageRoutingModule,
    CommonHeaderModule
  ],
  declarations: [CertificatePage]
})
export class CertificatePageModule {}
