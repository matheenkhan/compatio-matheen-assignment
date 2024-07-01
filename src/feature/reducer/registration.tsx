import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface UserState {
    users: any[];
}

// Define the initial state using that type
const initialState: UserState = { users: [{ id: 999, 'name': 'Try 1!', age: '87' }, { id: 998, age: '95' }] }

export const UserSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            state.users = [{ id: state.users.sort((a, b) => b?.id - a?.id)[0]?.id + 1 || 0, ...action.payload }, ...state.users];
        },
        addBulk: (state, action: PayloadAction<any>) => {
            if (Array.isArray(action.payload)) {
                state.users = [...state.users, ...action.payload];
            }
        },
        edit: (state, action: PayloadAction<any>) => {
            let tempStateIndex = state.users.findIndex((userToBeFound) => userToBeFound.id === action.payload.id)
            let tempState = [...state.users];
            tempState[tempStateIndex] = { ...action.payload }
            state.users = [...tempState];
        },
        deleteItem: (state, action: PayloadAction<any>) => {
            let tempState = [...state.users.filter(user => user.id !== action.payload)]
            state.users = [...tempState]
        }
    }
})

export const { add, edit, deleteItem, addBulk } = UserSlice.actions

export const selectUser = (state: RootState) => state.users

export default UserSlice.reducer