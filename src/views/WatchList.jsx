import React, { useEffect, useState } from 'react'
import { ResultTableComponent, ResultTableWrapper } from '../components/Table/ResultTable'

import { SimpleSearchField } from '../components/SearchField'
import { getWatchlist } from '../api/watchlist'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

export const WatchlistMovies = ({ accountId, sessionId }) => {
    return <React.Fragment>
        <ResultTableWrapper
            options={{ liveUpdate: true }}
            handleFetchDataChunck={
                async (setWatchlistMovies, options) => getWatchlist(accountId, sessionId, setWatchlistMovies, options)
            } />
    </React.Fragment>
}