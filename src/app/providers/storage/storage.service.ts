import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class StorageProvider {

  constructor(public local: Storage) {
  }

  get(key): any {
    return this.local.get(key);
  }

  set(key, value): any {
    return this.local.set(key, value);
  }

  remove(key): any {
    return this.local.remove(key);
  }

  clear(): any {
    return this.local.clear();
  }

}
