'use server'

import { cookies } from 'next/headers'

export const setUserCookie = async (userData: {
  id: string
  email: string
}) => {
  cookies().set('user-info', JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })
}

const getUserIdFromCookie = () => {
  const userCookie = cookies().get('user-info')
  const userData = JSON.parse(userCookie.value)
  return userData.id
}

//
export const getMovies = async () => {
  const data = await fetch(`${process.env.API_URL}/movies`)
  return await data.json()
}

export const getSeries = async () => {
  const data = await fetch(`${process.env.API_URL}/tvSeries`)
  return await data.json()
}

export const getBookmarks = async () => {
  const userId = getUserIdFromCookie()

  const data = await (
    await fetch(`${process.env.API_URL}/users?id=${userId}`)
  ).json()

  return data[0].bookmarks
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

export const addNewUser = async (userData: UserProfile) => {
  const response = await (
    await fetch(`${process.env.API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, bookmarks: [] }),
    })
  ).json()

  return response
}

export const addBookmarksForUser = async (videoInfo: CardData) => {
  try {
    // First, get the current user data
    const userId = getUserIdFromCookie()

    const getUserResponse = await fetch(
      `${process.env.API_URL}/users?id=${userId}`,
    )

    if (!getUserResponse.ok) {
      throw new Error(`User not found: ${getUserResponse.status}`)
    }

    const users = await getUserResponse.json()
    const user = users.find((u: any) => u.id === userId)

    if (!user) {
      //
    }

    // Add new bookmark to existing bookmarks
    const updatedBookmarks = [
      ...user.bookmarks,
      { ...videoInfo, isBookmarked: true },
    ]

    // Update the user with new bookmarks
    const updateResponse = await fetch(
      `${process.env.API_URL}/users/${user.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookmarks: updatedBookmarks,
        }),
      },
    )

    if (!updateResponse.ok) {
      //
    }

    const data = await updateResponse.json()
    return data
  } catch (error) {
    //
  }
}
