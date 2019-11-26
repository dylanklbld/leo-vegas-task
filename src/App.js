import './App.css';

import React, { useEffect, useState } from 'react';
import { authentication, deauthentication, establishSession } from './api/session'
import {getAllFavoriteIds, getAllWatchlistIds} from './utils/listIds'

import { FavoriteMovies } from './views/FavoriteMovies'
import { PopularMoviesTable } from './views/PopularMovies'
import { ResultTableComponent as ResultTable } from './components/Table/ResultTable';
import { SimpleSearchField as SearchField } from './components/SearchField'
import { SearchMoviesComponent } from './views/SearchMovies'
import { WatchlistMovies } from './views/WatchList'
import { fetchPopular } from './api/popular'
import { getAccountInfo } from './api/account'
import { getFavorites } from './api/favorites'

function App() {
  const [sessionData, setSessionData] = useState(null)
  
  const [favoriteIds, setFavoriteIds] = useState(null)
  const [watchlistIds, setWatchlistIds] = useState(null)

  const trySetSessionAfterRedirect = async () => {
    if (window && window.location.search) {
      const url = new URL(window.location.href)

      if (url.searchParams && url.searchParams.get("request_token")) {
        await establishSession(setSessionData, url.searchParams.get("request_token"))
      }
    }
  }

  const tryUpdateList = (movieId, status, list, updateList) => {
    if(status){
      updateList(list.filter(v=>v !== movieId))
    } else {
      updateList(list.concat([movieId]))
    }
  }

  const tryUpdateFavorites = (movieId, status) => tryUpdateList(movieId, status, favoriteIds, setFavoriteIds)
  const tryUpdateWatchlist = (movieId, status) => tryUpdateList(movieId, status, watchlistIds, setWatchlistIds)

  useEffect(() => {
    // since we will be redirected from the portal
    trySetSessionAfterRedirect()
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
  );
}

export default App;
