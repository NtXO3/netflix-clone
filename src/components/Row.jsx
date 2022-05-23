import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import axios from 'axios';
import Movie from './Movie';

const Row = ({ title, fetchUrl, rowId }) => {
    const [movies, setMovies] = useState([])
    

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

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft onClick={() => handleSlide('left')} size={40} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100  cursor-pointer z-10 hidden group-hover:block' />
                <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth relative'>
                    {
                        movies.map((item, id) => <Movie item={item} key={id} />)
                    }
                </div>
                <MdChevronRight onClick={() => handleSlide('right')} size={40} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
            </div>
        </>
    );
}

export default Row;
