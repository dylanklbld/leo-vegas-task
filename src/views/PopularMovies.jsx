import { MovieCellComponent } from '../components/Table/MovieCellComponent'
import React from 'react'
import { ResultTableWrapper } from '../components/Table/ResultTable'
import { fetchPopular } from '../api/popular'

export const PopularMoviesTable = () => {
    return <ResultTableWrapper
        renderMovieCellComponent={({ movieValue }) => {
            return <MovieCellComponent
                posterPath={movieValue['poster_path']}
                movieName={movieValue['original_title']}
            />
        }}

        handleFetchDataChunck={fetchPopular} />
} 