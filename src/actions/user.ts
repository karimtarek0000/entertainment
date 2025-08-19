'use server'

import { search } from '@/utils'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// Cookies
export const setUserCookie = async (userData: {
  id: string
  email: string
}) => {
  const cookieStore = await cookies()
  cookieStore.set('user-info', JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })
}

const getUserIdFromCookie = async () => {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('user-info')
  if (!userCookie) {
    throw new Error('User cookie not found')
  }
  const userData = JSON.parse(userCookie.value)
  return userData.id
}

export const getBookmarks = async (query?: string) => {
  const userId = await getUserIdFromCookie()

  const data = await (
    await fetch(`${process.env.API_URL}/users?id=${userId}`)
  ).json()

  return search(data[0].bookmarks, query!)
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
    const userId = await getUserIdFromCookie()

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
    const existingBookmark = user.bookmarks.find(
      (b: CardWrapperData) => b.id === videoInfo.id,
    )
    let bookmarks = null

    if (existingBookmark) {
      bookmarks = user.bookmarks.filter(
        (b: CardWrapperData) => b.id !== videoInfo.id,
      )
    } else {
      bookmarks = [...user.bookmarks, { ...videoInfo, isBookmarked: true }]
    }

    // Update the user with new bookmarks
    const updateResponse = await fetch(
      `${process.env.API_URL}/users/${user.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookmarks,
        }),
      },
    )

    if (!updateResponse.ok) {
      //
    }

    const data = await updateResponse.json()
    revalidatePath('/dashboard/bookmarks')

    return data
  } catch (error) {
    //
  }
}
