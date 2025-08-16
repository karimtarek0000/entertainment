'use server'

export const getMovies = async () => {
  const data = await fetch(`${process.env.API_URL}/movies`)
  return await data.json()
}
