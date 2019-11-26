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
  const [accountData, setAccountData] = useState(null)
  const [sessionIdData, setSessionIdData] = useState(null)
  
  const [favoriteIds, setFavoriteIds] = useState(null)
  const [watchlistIds, setWatchlistIds] = useState(null)

  const trySetSessionAfterRedirect = () => {
    if (window && window.location.search) {
      const url = new URL(window.location.href)

      if (url.searchParams && url.searchParams.get("request_token")) {
        establishSession(setSessionIdData, url.searchParams.get("request_token"))
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

  useEffect(() => {
    if (sessionIdData !== null && sessionIdData.success) {
      // save into cookies maybe writeSessionIdIntoCookies()
      const account = async () => {
        const accountData = await getAccountInfo(sessionIdData['session_id'])
        
        console.log('rerender sessionIdData')
        setAccountData(accountData)
      }

      account()
    }
  }, [sessionIdData])

  useEffect(()=>{
    const accountId = accountData && accountData['id']
    const sessionId =  sessionIdData && sessionIdData['session_id']

     
    console.log('rerender accountData')
    
    if(accountId && sessionId) {
         const getIds = async () =>{
             const favoriteIds = await getAllFavoriteIds(accountId, sessionId)
             const watchlistIds = await getAllWatchlistIds(accountId, sessionId)

             setFavoriteIds(favoriteIds)
             setWatchlistIds(watchlistIds)
         }    
         
         getIds()
     } 
 }, [accountData])



  return (
    <div className="App">
      <body>
        <div>
          {!sessionIdData ? <button onClick={async () => {
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
          {!accountData && sessionIdData && <PopularMoviesTable />}
          {sessionIdData && accountData && accountData['id'] && <FavoriteMovies sessionId={sessionIdData['session_id']} accountId={accountData['id']}/>}
          {/* {accountData && accountData['id'] && <WatchlistMovies sessionId={sessionIdData['session_id']} accountId={accountData['id']} />} */}
        </div>
      </body>
    </div>
  );
}

export default App;
