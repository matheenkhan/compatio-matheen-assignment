import { configureStore } from '@reduxjs/toolkit'
import userReducer from './feature/reducer/registration.tsx'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
})
