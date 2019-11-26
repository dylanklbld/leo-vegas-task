
const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

export const getAccountInfo = async (sessionId)=>{
    return await fetch(
         `${API}account?`  + new URLSearchParams({
             api_key: apiKey,
             session_id: sessionId
         }),
         {
           method: "GET",
         }
       )
         .then(res => res.json())
         .then(response =>
             response 
         )
         .catch(error => console.log(error))
 }