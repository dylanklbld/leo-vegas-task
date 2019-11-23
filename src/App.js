import './App.css';

import React, {useEffect, useState} from 'react';
import {authentication, establishSession} from './api/session'

import {PopularMoviesTable} from './views/PopularMovies'
import {ResultTableComponent as ResultTable} from './components/Table/ResultTable';
import {SimpleSearchField as SearchField} from './components/SearchField'
import {SearchMoviesComponent} from './views/SearchMovies'
import {fetchPopular} from './api/popular'

function App() {
  const [searchResultData,
    setSearchResultData] = useState(null)
  const [sessionIdData,
    setSessionIdData] = useState(null)

  const trySetSessionAfterRedirect = () => {
    if (window && window.location.search) {
      const url = new URL(window.location.href)

      if (url.searchParams && url.searchParams.get("request_token")) {
        establishSession(setSessionIdData, url.searchParams.get("request_token"))
      }
    }
  }

  const saveSessionAndAccountData = () => {
    // into the cookies I think
  }

  useEffect(() => {
    if (!sessionIdData) {
      //fetchPopular(setSearchResultData)
    }

    trySetSessionAfterRedirect()
  }, [])

  useEffect(() => {
    if (sessionIdData !== null && sessionIdData.success) {
      // save into cookies maybe writeSessionIdIntoCookies()
    }
    console.log('WOW', sessionIdData)
  }, [sessionIdData])

  return (
    <div className="App">
      <body>
        <div>
          <button onClick={async() => {
            await authentication()
          }}>testAuth</button>
          
          {/* {sessionIdData && sessionIdData.success
            ? <React.Fragment>
                <SearchField onSearchRequestDone={setSearchResultData}/>
                <ResultTable data={searchResultData}/>
              </React.Fragment>
            : (searchResultData && <ResultTable data={searchResultData.results}/>)} */}
            <SearchMoviesComponent />
        </div>
      </body>
    </div>
  );
}

export default App;
