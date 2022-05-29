import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface IPost{
    userId: number,
    id: number,
    title: string,
    body: string,
}

interface IInitialState{
    posts: IPost[],
    error: null | any
}

const initialState: IInitialState = {
    posts: [],
    error: null
}

export const fetchPosts = createAsyncThunk(
    "postsSlice",
    async () => {
        const pull = await fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                alert(error);
                return error;
            })
        return pull
    }
)

const postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.error = null;
            }
        )
        builder.addCase(
            fetchPosts.rejected, (state, action) => {
                state.error = action.payload;
            }
        )
    }
})

export default postsSlice.reducer;