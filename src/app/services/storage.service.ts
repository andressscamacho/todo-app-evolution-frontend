import { Injectable } from '@angular/core';

/**
 * Storage service helps manage data saving
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
