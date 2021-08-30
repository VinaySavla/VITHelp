import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonHeaderComponent } from './common-header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
  ],
  declarations: [CommonHeaderComponent],
  exports:[CommonHeaderComponent]
})
export class CommonHeaderModule {}
