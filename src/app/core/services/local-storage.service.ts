import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * Saves a key-value pair to local storage.
   *
   * @param key The key under which to store the value.
   * @param value The value to store. Can be any serializable data type.
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets a value from local storage based on the key.
   *
   * @param key The key used to retrieve the value.
   * @returns The stored value if found, otherwise null.
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing localStorage item:', key, error);
      return null;
    }
  }

  /**
   * Removes a key-value pair from local storage.
   *
   * @param key The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears the entire local storage.
   */
  clear(): void {
    localStorage.clear();
  }
}
