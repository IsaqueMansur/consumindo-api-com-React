import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  // eslint-disable-next-line no-unused-vars
  const persistedReducers = persistReducer(
    {
      key: 'CONSUMO-API',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  );

  return persistedReducers;
};
