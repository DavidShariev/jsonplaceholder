import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface IComment{
    postId: number,
    id: number,
    name: string,
    email: string
    body: string
};

interface IInitialState{
    comments: IComment[],
    error: null | any
};

const initialState: IInitialState = {
    comments: [],
    error: null
};

export const fetchComments = createAsyncThunk(
    "commentsSlice",
    async () => {
        const pull = await fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                alert(error);
                return error
            })
        return pull
    }
);

export const addComment = createAsyncThunk(
    "commentsSliceAdd",
    async (data: IComment) => {
        const pull = fetch(`https://jsonplaceholder.typicode.com/comments/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then(data => data)
        .catch(error => {
            alert(error);
            return error;
        })
        return pull;
    }
)

const commentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            fetchComments.rejected, (state, action) => {
                state.error = action.payload;
            }
        );
        builder.addCase(
            addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
                state.error = null
            }
        );
        builder.addCase(addComment.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
})

export default commentsSlice.reducer;