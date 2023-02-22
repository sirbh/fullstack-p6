import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, update } from "./services";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "./contexts/notificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries("anecdotes");
      dispatch({
        type:"SET",
        payload:`anecdote '${anecdote.content}' voted`
      })
      setTimeout(() => {
        dispatch({
          type: "SET",
          payload: "",
        });
      }, 5000);
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
  };

  const { isLoading, isError, data } = useQuery("anecdotes", getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (isError) {
    return <div>anecdote service not working</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
