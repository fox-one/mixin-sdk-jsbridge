import { storage } from 'peeler-js/es/storage';
import getLogger from '../logger';

type StorageType = 'cookie' | 'localStorage' | 'sessionStorage';
let storageType: StorageType = 'localStorage';
const logger = getLogger('storage');

export function setStorageType(type: StorageType) {
  if (!type || type === storageType) return;

  storageType = type;
}

export const store = {
  get: (key: string) => storage.get(key, storageType),
  set: (key: string, val: any) => {
    try {
      if (typeof val !== 'string') {
        val = JSON.stringify(val);
      }
      return storage.set(key, val, storageType);
    } catch (err) {
      logger().warn('set storage error', err as Error);
      return false;
    }

  },
  clear: (key: string) => storage.clear(key, storageType)
};

export default store;