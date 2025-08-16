import { getMovies } from '@/actions'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Movies() {
  const movies = await getMovies()

  return (
    <section className="container">
      <h1 className="page-heading">Movies</h1>

      <Suspense fallback={<SkeletonCard count={25} />}>
        <CardWrapper type="Movie" data={movies} />
      </Suspense>
    </section>
  )
}
