
const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

export const search = async (searchQuery, handleSetData)=>{
    await fetch(
         `${API}search/movie?`  + new URLSearchParams({
             api_key: apiKey,
             query: searchQuery
         }),
         {
           method: "GET",
         }
       )
         .then(res => res.json())
         .then(response =>
             handleSetData(response) 
         )
         .catch(error => console.log(error))
 }