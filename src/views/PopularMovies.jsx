import React, {useEffect, useState} from 'react'
import {ResultTableComponent, ResultTableWrapper} from '../components/Table/ResultTable'

import {fetchPopular} from '../api/popular'
import useDebounce from '../hooks/useDebounce'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
const emptyString = ''

export const PopularMoviesTable = () => {
    const fetchPopularCallback = React.useCallback(fetchPopular)
    return <ResultTableWrapper handleFetchDataChunck={fetchPopularCallback} />
} 