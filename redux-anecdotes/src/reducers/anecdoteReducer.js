import { createSlice } from "@reduxjs/toolkit";
import { getAll, createNew, update } from "../services";
import { showNotification } from "./notificationReducer";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const votedAnecdoteId = state.findIndex(
        (anecdote) => anecdote.id === action.payload.id
      );
      state[votedAnecdoteId] = action.payload;
    },
    create(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const  initialiseAnecdotes = ()=> {
  return async (dispatch) => {
    const anecdotes = await getAll();
    console.log(anecdotes);
    dispatch(setAnecdotes(anecdotes));
  };
}

export const createNewAnecdote = (content)=> {
  return async (dispatch) => {
    const anecdote = await createNew(content);
    dispatch(create(anecdote))
    dispatch(showNotification('new anecdote create',5))
  }
}

export const voteAnecdote = (anecdote)=> {

  return async(dispatch)=>{
    const updatedAnecdote = await update({
      ...anecdote,
      votes:anecdote.votes+1
    })
    dispatch(vote(updatedAnecdote))
    dispatch(showNotification(`you voted '${updatedAnecdote.content}'`,5))
  }
}


export const { vote, create, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
