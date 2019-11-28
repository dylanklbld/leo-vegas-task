
const API = 'https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

export const getWatchlist = async (accountId, sessionId, handleSetData, options = {}) => {
    return await fetch(
        `${API}account/${accountId}/watchlist/movies?` + new URLSearchParams(Object.assign({
            api_key: apiKey,
            session_id: sessionId
        }, options.page
            ? {
                page: options.page
            }
            : {})),
        {
            method: "GET",
        }
    )
        .then(res => res.json())
        .then(response => {
            handleSetData && handleSetData(response)
            return response
        }
        )
        .catch(error => console.log(error))
}


export const addToWatchlist = async (sessionId, accountId, movieId, watchlist = true) => {
    await fetch(
        `${API}account/${accountId}/watchlist?` + new URLSearchParams({
            api_key: apiKey,
            session_id: sessionId
        }),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "media_type": "movie",
                "media_id": movieId,
                "watchlist": watchlist
            })
        }
    )
        .then(res => res.json())
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
}

export const removeFromWatchlist = async (sessionId, accountId, movieId) => await addToWatchlist(sessionId, accountId, movieId, false)
