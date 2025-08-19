import { getMovies } from '@/actions/resourcess'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Movies({ searchParams }: PageProps) {
  const query = searchParams.search || ''
  const movies = await getMovies(query)

  return (
    <section className="container">
      <h1 className="page-heading">Movies</h1>

      <Suspense fallback={<SkeletonCard count={25} />}>
        <CardWrapper data={movies as []} />
      </Suspense>
    </section>
  )
}
