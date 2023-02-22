import axios from 'axios'

const baseurl = "http://localhost:3001/anecdotes"

export const getAll = ()=>{
    return axios.get(baseurl).then(res=>res.data)
}

export const add = (content)=>{
    const anecdote = {
        content,
        votes:0
    }
    return axios.post(baseurl,anecdote).then(res=>res.data)
}

export const update = (anecdote)=>{
    const updatedAnecdote = {
        ...anecdote,
        votes:anecdote.votes+1
    }
    return axios.put(`${baseurl}/${anecdote.id}`,updatedAnecdote).then(res=>res.data)
}