import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Card from './assets/components/card';

const generateMovieListCard = (movieList, isLoading) => {
  if (isLoading) {
    return(
      [...Array(8)].map((_, index) => (
        <div key={ index } className='col-span-4 sm:col-span-2 md:col-span-1'>
          <Card title={''} poster={''} isLoading={isLoading} />
        </div>
      ))
      
    )
  }

  if (!Array.isArray(movieList) || movieList.length == 0) {
    return(
      <div className=' col-span-4 flex justify-center items-center h-40'>
        <p className='p-4 bg-slate-700 text-lg'>Movie Not Found</p>
      </div>
    )
  }

  return(
    movieList.map((data, index) => (
      <div key={ index } className='col-span-4 sm:col-span-2 md:col-span-1'>
          <Card title={data.Title} poster={data.Poster} isLoading={isLoading} />
      </div>
    ))
  )
}

function App() {
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')

  const searchMovie = () => {
    setIsLoading(true)
    getMovieByTitle(title)
    setTitle('')
  }

  const getMovieByTitle = async () => {
    
    try {
      const response = await fetch('https://omdbapi.com/?apikey=fb3b9011&r=json&s=' + (title == '' ? 'avengers' : title));
      const result = await response.json();
      setMovieList(result.Search)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getMovieByTitle()
  }, [])

  return (
    <div>
      <div className='flex flex-row justify-center md:justify-between items-center px-10 py-2 bg-slate-500'>
        <h1 className=' hidden md:block font-semibold text-xl'>Final Project</h1>
        <div className='flex flex-row gap-2'>
          <input type='text' className='p-2 rounded-md' id='inputSearch' name='inputSearch' value={title} onChange={(e) => setTitle(e.target.value)} />
          <button className=' py-2 px-4' id='btnSearch' onClick={() => searchMovie()}>Search</button>
        </div>
      </div>
      <div className='grid grid-cols-4 grid-flow-row gap-8 p-10'>
        {generateMovieListCard(movieList, isLoading)}
      </div>
    </div>
  )
}

export default App
