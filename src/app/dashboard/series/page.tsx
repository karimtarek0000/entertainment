import { getSeries } from '@/actions/resourcess'
import NotFoundContent from '@/components/molecules/NotFoundContent'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Series({ searchParams }: PageProps) {
  const sp = await searchParams
  const query = sp.search || ''
  const series = await getSeries(query)

  return (
    <section className="container">
      <h1 className="page-heading">TV Series</h1>

      <Suspense fallback={<SkeletonCard count={25} />}>
        <NotFoundContent
          data={series as []}
          type="series"
          title="No series available"
        >
          <CardWrapper data={series as []} />
        </NotFoundContent>
      </Suspense>
    </section>
  )
}
