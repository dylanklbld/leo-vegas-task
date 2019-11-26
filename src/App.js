import './App.css';

import React, { useEffect, useState } from 'react';
import { addToFavorites, getFavorites, removeFromFavorites } from './api/favorites'
import { authentication, deauthentication, establishSession, establishSessionFromCookies } from './api/session'
import {getAllFavoriteIds, getAllWatchlistIds} from './utils/listIds'

import { FavoriteMovies } from './views/FavoriteMovies'
import { PopularMoviesTable } from './views/PopularMovies'
import { ResultTableComponent as ResultTable } from './components/Table/ResultTable';
import { SimpleSearchField as SearchField } from './components/SearchField'
import { SearchMoviesComponent } from './views/SearchMovies'
import { WatchlistMovies } from './views/WatchList'
import { fetchPopular } from './api/popular'
import { getAccountInfo } from './api/account'

function App() {
  const [sessionData, setSessionData] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState(null)
  const [watchlistIds, setWatchlistIds] = useState(null)

  const trySetSessionFromCookies = async () => {
   return await establishSessionFromCookies(setSessionData)
  }

  const trySetSessionAfterRedirect = async () => {
    if (window && window.location.search) {
      const url = new URL(window.location.href)

      if (url.searchParams && url.searchParams.get("request_token")) {
        await establishSession(setSessionData, url.searchParams.get("request_token"))
      }
    }
  }

  const trySetSession = async () => {
    const success = await trySetSessionFromCookies()

    console.log(success, "SUCCESS")

    if(!success){
      await trySetSessionAfterRedirect()
    }
  }

  const tryUpdateList = async (movieId, status, list, updateList, apiCallAdd, apiCallRemove) => {
    if (status) {
      try{
        await apiCallRemove(sessionData && sessionData.sessionId['session_id'], sessionData && sessionData.accountId['id'], movieId)
        updateList(list.filter(v => v !== movieId))
      }catch (error) {
        console.log(error)
      }
    } else {
      apiCallAdd(sessionData && sessionData.sessionId['session_id'], sessionData && sessionData.accountId['id'], movieId).then(() =>
        updateList(list.concat([movieId]))
      ).catch(error => console.log(error))
    }
  }

  const tryUpdateFavorites = (movieId, status) => tryUpdateList(movieId, status, favoriteIds, setFavoriteIds, addToFavorites, removeFromFavorites)
  const tryUpdateWatchlist = (movieId, status) => tryUpdateList(movieId, status, watchlistIds, setWatchlistIds)

  useEffect(() => {
    trySetSession()
  }, [])

  useEffect(()=>{
    const accountId = sessionData && sessionData.accountId['id']
    const sessionId =  sessionData && sessionData.sessionId['session_id']
    
    if(accountId && sessionId) {
      const getIds = async () =>{
          const favoriteIds = await getAllFavoriteIds(accountId, sessionId)
          const watchlistIds = await getAllWatchlistIds(accountId, sessionId)

          setFavoriteIds(favoriteIds)
          setWatchlistIds(watchlistIds)
      }    

      getIds()
    } 
 }, [sessionData])

 console.log("WTF IS GOING ON HERE")
  return (
    <div className="App">
      <body>
        <div>
          {!sessionData ? <button onClick={async () => {
            await authentication()
          }}> Give Access To Application</button>  :

          <button onClick={async () => {
            await deauthentication()
          }}> Reset</button>}

          {/* {sessionIdData && sessionIdData.success
            ? <React.Fragment>
                <SearchField onSearchRequestDone={setSearchResultData}/>
                <ResultTable data={searchResultData}/>
              </React.Fragment>
            : (searchResultData && <ResultTable data={searchResultData.results}/>)} */}
          {<SearchMoviesComponent {...{ favoriteIds, updateFavoritesList: tryUpdateFavorites }} />}
          {sessionData && <FavoriteMovies sessionId={sessionData.sessionId['session_id']} accountId={sessionData.accountId['id']}/>}
          {/* {accountData && accountData['id'] && <WatchlistMovies sessionId={sessionIdData['session_id']} accountId={accountData['id']} />} */}
        </div>
      </body>
    </div>
  )
}

export default App
