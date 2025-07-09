import { Inject, Injectable, Optional } from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly storage: Storage;

  constructor(@Optional() @Inject('Window') private injectedWindow: Window) {
    // Используем инжектированный window, если он доступен, иначе глобальный window
    this.storage = this.injectedWindow?.sessionStorage || (typeof window !== 'undefined' ? window.sessionStorage : undefined);
    if (!this.storage) {
      throw new Error('SessionStorage is not available');
    }
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