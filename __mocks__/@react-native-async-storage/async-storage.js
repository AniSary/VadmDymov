const mockStorage = {};

export default {
  setItem: jest.fn(async (key, value) => {
    mockStorage[key] = value;
    return Promise.resolve();
  }),
  getItem: jest.fn(async (key) => {
    return Promise.resolve(mockStorage[key] || null);
  }),
  removeItem: jest.fn(async (key) => {
    delete mockStorage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(async () => {
    for (let key in mockStorage) {
      delete mockStorage[key];
    }
    return Promise.resolve();
  }),
};