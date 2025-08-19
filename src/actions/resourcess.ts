'use server'

import { getBookmarks } from '@/actions/user'
import { markAsBookmark, search } from '@/utils'

export const getCategories = async (query: string) => {
  const bookmarks = await getBookmarks()

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

  const trending = search(
    markAsBookmark(
      [...trendingTvData, ...trendingMovieData] as [],
      bookmarks,
    ) as [],
    query,
  )
  const recommended = search(
    markAsBookmark(
      [...recommendedTvData, ...recommendedMovieData] as [],
      bookmarks,
    ) as [],
    query,
  )

  return {
    trending,
    recommended,
  }
}

export const getMovies = async (query: string) => {
  const bookmarks = await getBookmarks()

  const data = await fetch(`${process.env.API_URL}/movies`)
  const list = await data.json()

  return search(markAsBookmark(list, bookmarks) as [], query)
}

export const getSeries = async (query: string) => {
  const bookmarks = await getBookmarks()

  const data = await fetch(`${process.env.API_URL}/tvSeries`)
  const list = await data.json()

  return search(markAsBookmark(list, bookmarks) as [], query)
}
