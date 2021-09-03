import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { DistanceInKMPipe } from "./distanceInKM/distance-in-km.pipe";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DistanceInKMPipe],
  exports: [DistanceInKMPipe]
})
export class PipeModule {}
