import './App.css';

import React, {useEffect, useState} from 'react';
import {authentication, establishSession} from './api/session'

import {MovieOverviewComponent} from './components/MovieOverviewComponent'
import { ResultTable } from './components/ResultTable';
import {SimpleSearchField as SearchField} from './components/SearchField'
import {fetchPopular} from './api/popular'

const PopularOverview = ({popularMovies})=>{
 return popularMovies.map((value, i) => 
   <MovieOverviewComponent key={i} data={value} />
 )
}

function App() {
  const [searchResultData, setSearchResultData] = useState(null)
  const [sessionIdData, setSessionIdData] = useState(null)

  const trySetSessionAfterRedirect = () => {
    if(window && window.location.search){
      const url = new URL(window.location.href)

      if(url.searchParams && url.searchParams.get("request_token")){
        establishSession(setSessionIdData, url.searchParams.get("request_token"))
      }
    }
  }


const saveSessionAndAccountData=() =>{
  // into the cookies I think
}

  useEffect(()=>{
    if(!sessionIdData){
      fetchPopular(setSearchResultData)
    }
    
    trySetSessionAfterRedirect()
  }, [])

  useEffect(()=>{
    if(sessionIdData !== null && sessionIdData.success){
      // save into cookies maybe
      //writeSessionIdIntoCookies()
    }
    console.log('WOW', sessionIdData)
  }, [sessionIdData])

  
  return (
    <div className="App">
      <body>
        <div>
        <button onClick={async ()=>{
          await authentication()
        }}>testAuth</button>
        {sessionIdData && sessionIdData.success ? 
        <React.Fragment>
          <SearchField onSearchRequestDone={setSearchResultData} />
          <ResultTable data={searchResultData} />
        </React.Fragment>
        : 
          (searchResultData && <PopularOverview popularMovies={searchResultData.results}/>)}
          
        </div>
      </body>
    </div>
  );
}

export default App;
