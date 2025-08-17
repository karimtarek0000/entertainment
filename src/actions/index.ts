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

export const addBookmarksForUser = async (
  userId: string,
  videoInfo: CardData,
) => {
  try {
    // First, get the current user data
    const getUserResponse = await fetch(
      `${process.env.API_URL}/users?id=${userId}`,
    )

    if (!getUserResponse.ok) {
      throw new Error(`User not found: ${getUserResponse.status}`)
    }

    const users = await getUserResponse.json()
    const user = users.find((u: any) => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Add new bookmark to existing bookmarks
    const updatedBookmarks = [...user.bookmarks, videoInfo]

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
      throw new Error(`Failed to update bookmarks: ${updateResponse.status}`)
    }

    const data = await updateResponse.json()
    return data
  } catch (error) {
    console.error('Error adding bookmark:', error)
    throw error
  }
}
