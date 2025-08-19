import { getMovies } from '@/actions/resourcess'
import NotFoundContent from '@/components/molecules/NotFoundContent'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Movies({ searchParams }: PageProps) {
  const sp = await searchParams
  const query = sp.search || ''
  const movies = await getMovies(query)

  return (
    <section className="container">
      <h1 className="page-heading">Movies</h1>

      <Suspense fallback={<SkeletonCard count={25} />}>
        <NotFoundContent
          data={movies as []}
          title="No movies available"
          type="movies"
        >
          <CardWrapper data={movies as []} />
        </NotFoundContent>
      </Suspense>
    </section>
  )
}
