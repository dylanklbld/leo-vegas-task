import React from 'react'
import { ResultTableWrapper } from '../components/Table/ResultTable'
import {fetchPopular} from '../api/popular'

export const PopularMoviesTable = () => {
    return <ResultTableWrapper handleFetchDataChunck={fetchPopular} />
} 