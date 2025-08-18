import { getSeries } from '@/actions/resourcess'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Series() {
  const series = await getSeries()

  return (
    <section className="container">
      <h1 className="page-heading">TV Series</h1>

      <Suspense fallback={<SkeletonCard count={25} />}>
        <CardWrapper data={series as []} />
      </Suspense>
    </section>
  )
}
