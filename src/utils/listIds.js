import { getFavorites } from "../api/favorites"
import { getWatchlist } from "../api/watchlist"

const getListMoviesId = async (accountId, sessionId, getListRequest)=>{
    const list = await getListRequest(accountId, sessionId)

    if(list['total_pages'] > 1){
      const favs = [...Array(list['total_pages']-1).keys()].map(async (value)=>
        await getListRequest(accountId, sessionId, null,{page:value+2})
      )

      return Promise.all(favs).then(data=> 
       list.results.concat(data.map(v=>v.results).flat()).map(res=>res.id)
      )
    }
  }

 export const getAllFavoriteIds = async(accountId, sessionId) => getListMoviesId(accountId, sessionId, getFavorites)

 export const getAllWatchlistIds = async(accountId, sessionId) => getListMoviesId(accountId, sessionId, getWatchlist)