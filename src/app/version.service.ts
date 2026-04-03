import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor() { }

  public get() {
    return '7.0.0';
  }

}
