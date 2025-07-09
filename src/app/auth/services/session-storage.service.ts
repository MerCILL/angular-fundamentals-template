import { Injectable, Inject, Optional } from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storage: Storage;
  
  constructor(@Optional() @Inject('Window') private window?: Window) {
    this.storage = this.window?.sessionStorage || {
      getItem: (key: string) => null,
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {},
      clear: () => {},
      length: 0,
      key: (index: number) => null
    } as Storage;
  }

  setToken(token: string): void {
    this.storage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.storage.getItem(TOKEN);
  }

  deleteToken(): void {
    this.storage.removeItem(TOKEN);
  }
}