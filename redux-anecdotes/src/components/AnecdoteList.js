import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
// import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );
  const dispatch = useDispatch();

  const clickHandler = (anecdote)=>{
    dispatch(voteAnecdote(anecdote))
    // dispatch(setNotification(`you voted '${anecdote.content}'`))
    // setTimeout(()=>{
    //   dispatch(setNotification(''))
    // },5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => clickHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
