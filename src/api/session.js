
const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

const getMovieDbPermissionLink = (requestToken) => `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${`http://localhost:3000`}`

const getRequestToken = async ()=>{
    const token = await fetch(
        `${API}authentication/token/new?`  + new URLSearchParams({
            api_key: apiKey
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

    return token
}

const getNewSessionId = async(requestToken)=>{
    const sessionId = await fetch(
        `${API}authentication/session/new?`  + new URLSearchParams({
            api_key: apiKey
        }),
        {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({request_token: requestToken})
        }
        )
        .then(res => res.json())
        .then(response =>
            response
        )
        .catch(error => console.log(error))

    return sessionId
}

export const authentication = async () => {
    const requestToken = await getRequestToken()
    window.location.replace(getMovieDbPermissionLink(requestToken['request_token']))
}

export const establishSession = async (handleSetSession, requestToken) => {
    const sessionId = await getNewSessionId(requestToken)
    handleSetSession(sessionId)
}
 