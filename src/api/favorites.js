
const API = 'https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'

export const getFavorites = async (accountId, sessionId, handleSetData, options = {}) => {
    return await fetch(
        `${API}account/${accountId}/favorite/movies?` + new URLSearchParams(Object.assign({
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

export const addToFavorites = async (sessionId, accountId, movieId, isFavorite = true) => {
    try {
        return await fetch(
            `${API}account/${accountId}/favorite?` + new URLSearchParams({
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
                    "favorite": isFavorite
                })
            }
        )
            .then(response => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }

                return response.json()
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log("ERROR")
                throw error
            })
    } catch (err) {
        throw err
    }
}

export const removeFromFavorites = async (sessionId, accountId, movieId) => await addToFavorites(sessionId, accountId, movieId, false)