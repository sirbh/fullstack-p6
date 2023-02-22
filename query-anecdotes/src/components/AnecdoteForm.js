import { useMutation, useQueryClient } from "react-query";
import { add } from "../services";
import {useNotificationDispatch} from "../contexts/notificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(add, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries("anecdotes");
      dispatch({
        type:"SET",
        payload:`anecdote '${anecdote.content}' created`
      })
      setTimeout(()=>{
        dispatch({
          type:"SET",
          payload:''
        })
      },5000)
    },
    onError: ()=>{
      dispatch({
        type:"SET",
        payload:`anecdote too short, It must have length 5 or more`
      })
      setTimeout(()=>{
        dispatch({
          type:"SET",
          payload:''
        })
      },5000)
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
