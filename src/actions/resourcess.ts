'use server'

import { getBookmarks } from '@/actions/user'
import { markAsBookmark } from '@/utils'

export const getCategories = async () => {
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

  const trending = markAsBookmark(
    [...trendingTvData, ...trendingMovieData] as [],
    bookmarks,
  )
  const recommended = markAsBookmark(
    [...recommendedTvData, ...recommendedMovieData] as [],
    bookmarks,
  )

  return {
    trending,
    recommended,
  }
}

export const getMovies = async () => {
  const bookmarks = await getBookmarks()

  const data = await fetch(`${process.env.API_URL}/movies`)
  const list = await data.json()

  return markAsBookmark(list, bookmarks)
}

export const getSeries = async () => {
  const bookmarks = await getBookmarks()

  const data = await fetch(`${process.env.API_URL}/tvSeries`)
  const list = await data.json()

  return markAsBookmark(list, bookmarks)
}
