import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser{
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: number,
            lng: number
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
};

interface IInitialState {
    users: IUser[],
    error: null | any
}

const initialState: IInitialState = {
    users: [],
    error: null
}

export const fetchUsers = createAsyncThunk(
    "usersSlice",
    async () => {
        const pull = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                alert(error);
                return error;
            });
        return pull
    }
);

const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            fetchUsers.rejected, (state, action) => {
                state.error = action.payload
            }
        )
    }
})

export default usersSlice.reducer;