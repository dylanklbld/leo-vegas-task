import './App.css';

import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { addToFavorites, removeFromFavorites } from './api/favorites'
import { addToWatchlist, removeFromWatchlist } from './api/watchlist'
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
  const [errors, setErrors] = useState(null)
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
      try{
        await apiCallAdd(sessionData && sessionData.sessionId['session_id'], sessionData && sessionData.accountId['id'], movieId)
        updateList(list.concat([movieId]))
      }catch (error) {
        console.log(error)
      }
    }
  }

  const tryUpdateFavorites = (movieId, status) => tryUpdateList(movieId, status, favoriteIds, setFavoriteIds, addToFavorites, removeFromFavorites)
  const tryUpdateWatchlist = (movieId, status) => tryUpdateList(movieId, status, watchlistIds, setWatchlistIds, addToWatchlist, removeFromWatchlist)

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

  return (
    <div className="App">
      <body>
        <div className =".wrapper">
          {!sessionData ? <button className="btn" onClick={async () => {
            await authentication()
          }}> Give Access To Application</button>  :

          <button className="btn" onClick={async () => {
            await deauthentication()
          }}> Reset</button>}

          <div className=".main-area ">
          {/* {sessionIdData && sessionIdData.success
            ? <React.Fragment>
                <SearchField onSearchRequestDone={setSearchResultData}/>
                <ResultTable data={searchResultData}/>
              </React.Fragment>
            : (searchResultData && <ResultTable data={searchResultData.results}/>)} */}
          {/* {<SearchMoviesComponent {...{ favoriteIds, updateFavoritesList: tryUpdateFavorites, updateWatchlist: tryUpdateWatchlist }} />} */}
          {/* {sessionData && <FavoriteMovies sessionId={sessionData.sessionId['session_id']} accountId={sessionData.accountId['id']}/>} */}
          {/* {accountData && accountData['id'] && <WatchlistMovies sessionId={sessionIdData['session_id']} accountId={accountData['id']} />} */}
        </div>
        <Router>
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/search'} className="nav-link">Search</Link></li>
              <li><Link to={'/watchlist'} className="nav-link">Watchlist</Link></li>
              <li><Link to={'/favorites'} className="nav-link">Favorite Movies</Link></li>
            </ul>
            </nav>
            <hr />
            <Switch>
                <Route exact path='/' component={()=><PopularMoviesTable />} />
                <Route path='/search' component={()=><SearchMoviesComponent {...{ favoriteIds, updateFavoritesList: tryUpdateFavorites, updateWatchlist: tryUpdateWatchlist }} />} />
                <Route path='/watchlist' component={()=><PopularMoviesTable />} />
                <Route path='/favorites' component={()=><PopularMoviesTable />} />
            </Switch>
          </div>
        </Router>
        </div>
      </body>
    </div>
  )
}

export default App
