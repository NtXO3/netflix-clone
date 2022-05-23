import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import axios from 'axios';
import Movie from './Movie';

const Row = ({ title, fetchUrl, rowId }) => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    
    useEffect(() => {
        axios.get(fetchUrl).then(response => {
            setMovies(response.data.results)
        })
    }, [fetchUrl])

    const handleSlide = (dir) => {
        var slider = document.getElementById('slider' + rowId)
        if (dir === 'left') {
            slider.scrollLeft = slider.scrollLeft - 500
        }
        if (dir === 'right') {
            slider.scrollLeft = slider.scrollLeft + 500
        }
    }

    // const selectMovie = async (passedId) => {
    //     const selectedMovieEl = document.getElementById('selected-movie')
    //     const movieElId = document.getElementById(passedId)
    //     const movieInfo = movies.find(item => item.id === passedId)
    //     if (selectedMovie.movieInfo === movieInfo) {
    //         selectedMovieEl.style.maxHeight = 0            
    //         setTimeout(() => {
    //             setSelectedMovie({})
    //         }, 300)
    //     } else {
    //         setSelectedMovie({...selectedMovie, movieInfo})
    //         setTimeout(() => {
    //             selectedMovieEl.style.maxHeight = selectedMovieEl.scrollHeight + 'px'
    //             console.log(selectedMovieEl)
    //         }, 10)
    //     }
    // }

    const selectMovie = (passedId) => {
        const selectedMovieEl = document.getElementById('selected-movie')
        const movieInfo = movies.find(item => item.id === passedId)
        if (selectedMovie.movieInfo === movieInfo) {
            setSelectedMovie({}) 
        } else {
            setSelectedMovie({...selectedMovie, movieInfo})
        }
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={() => handleSlide('left')} size={40} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' />
                <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative'>
                    {
                        movies.map((item, id) => <Movie selectMovie={selectMovie} item={item} key={id} />)
                    }
                </div>
                <MdChevronRight onClick={() => handleSlide('right')} size={40} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
            </div>
            {
                selectedMovie.movieInfo?.id ?
                // <h1 className='text-white'>{selectedMovie.movieInfo?.id}</h1>
                <div className='w-full h-[550px] text-white relative' id={'selected-movie'} key={selectedMovie.movieInfo?.id}>
                    <div className="w-full h-full" id={selectedMovie.movieInfo?.id}>
                        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                        <img className='w-full h-full object-cover' src= {`https://image.tmdb.org/t/p/original/${selectedMovie.movieInfo?.backdrop_path}`} alt={selectedMovie.movieInfo?.title} />
                        <div className='absolute w-full top-[20%] p-4 md:p-8'>
                            <h1 className='text-3xl md:text-5xl font-bold'>{selectedMovie.movieInfo?.title}</h1>
                            <div className='my-4'>
                                <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                                <button className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
                            </div>
                            <p className='text-gray-400 text-sm'>Released: {selectedMovie.movieInfo?.release_date}</p>
                            <p className='w-full md:max-w-[70%] lg:max-w[50%] xl:max-w-[35%] text-gray-200 my-4' >{
                                selectedMovie.movieInfo?.overview
                            }</p>
                        </div>
                    </div>
                </div>
                :
                <div id="selected-movie"></div>
            }
        </>
    );
}

export default Row;
