import { removeCookie, writeCookie } from '../utils/cookie'

import { getAccountInfo } from './account'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

const localhostUrl = `http://localhost:3000`
const getMovieDbPermissionLink = (requestToken) => `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${localhostUrl}`

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
    writeCookie('request_token', requestToken['request_token'])

    window.location.replace(getMovieDbPermissionLink(requestToken['request_token']))
}

export const establishSession = async (handleSetSession, requestToken) => {
    const sessionId = await getNewSessionId(requestToken)
    writeCookie('session_id', sessionId['session_id'])
    
    const accountId = await getAccountInfo(sessionId['session_id'])
    writeCookie('account_id', accountId['id'])
    
    handleSetSession({
        sessionId,
        accountId
    })
}

export const deauthentication = async () => {
    removeCookie('request_token')
    removeCookie('session_id')

    window.location.replace(localhostUrl)
}
 
 