import { Component } from '@angular/core';
import { StorageProvider } from "./providers/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private keystore: StorageProvider) {}
}
