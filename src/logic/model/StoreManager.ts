import Serializable from "../../store/BaseStore";

class StoreManager {
  loadStore<T>(clazz: new (prop?: T) => T, key: string): T {
    const storeProps = JSON.parse(localStorage.getItem(key) || "null");
    return new clazz(storeProps) || new clazz();
  }

  writeStore<T extends Serializable<P>, P>(key: string, value: T | null) {
    localStorage.setItem(key, JSON.stringify(value ? value.serialize() : null));
  }
}

const storeManager = new StoreManager();
export default storeManager;
