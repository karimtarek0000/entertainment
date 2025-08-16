'use server'

export const getMovies = async () => {
  const data = await fetch(`${process.env.API_URL}/movies`)
  return await data.json()
}

export const getSeries = async () => {
  const data = await fetch(`${process.env.API_URL}/tvSeries`)
  return await data.json()
}

export const getCategories = async () => {
  const [
    trendingTvSeries,
    recommendedTvSeries,
    trendingMovies,
    recommendedMovies,
  ] = await Promise.all([
    fetch(`${process.env.API_URL}/tvSeries?category=trending`),
    fetch(`${process.env.API_URL}/tvSeries?category=recommended`),
    fetch(`${process.env.API_URL}/movies?category=trending`),
    fetch(`${process.env.API_URL}/movies?category=recommended`),
  ])

  const [
    trendingTvData,
    recommendedTvData,
    trendingMovieData,
    recommendedMovieData,
  ] = await Promise.all([
    trendingTvSeries.json(),
    recommendedTvSeries.json(),
    trendingMovies.json(),
    recommendedMovies.json(),
  ])

  return {
    trending: [...trendingTvData, ...trendingMovieData],
    recommended: [...recommendedTvData, ...recommendedMovieData],
  }
}
