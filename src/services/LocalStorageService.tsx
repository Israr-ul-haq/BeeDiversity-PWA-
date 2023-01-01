const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

const clear = () => {
  localStorage.clear();
};

const key = (index: number): string | null => {
  return localStorage.key(index);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const length = (): number => {
  return localStorage.length;
};

const localStorageService: Storage = {
  setItem: setItem,
  getItem: getItem,
  clear: clear,
  key: key,
  removeItem: removeItem,
  length: length(),
};

export default localStorageService;
