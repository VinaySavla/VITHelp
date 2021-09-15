import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificatePageRoutingModule } from './certificate-routing.module';

import { CertificatePage } from './certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificatePageRoutingModule
  ],
  declarations: [CertificatePage]
})
export class CertificatePageModule {}
