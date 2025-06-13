class StorageAccessor {
    constructor(public key: string) {
      this.key = key;
    }
  
    get = () => JSON.parse(localStorage.getItem(this.key) ?? 'null');
  
    set = (val: unknown) => localStorage.setItem(this.key, JSON.stringify(val));
  
    remove = () => localStorage.removeItem(this.key);
}

export const historyStorage = new StorageAccessor('chat-history');

export const activeUserStorage = new StorageAccessor('currentUser');

export const appUsersStorage = new StorageAccessor('users');
