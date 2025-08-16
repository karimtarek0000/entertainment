import { getCategories } from '@/actions'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Dashboard() {
  const { trending, recommended } = await getCategories()

  return (
    <article className="container space-y-6">
      <section>
        <h1 className="page-heading">Trending</h1>

        <Suspense fallback={<SkeletonCard count={10} />}>
          <CardWrapper data={trending} />
        </Suspense>
      </section>

      <section>
        <h2 className="page-heading">Recommended for you</h2>

        <Suspense fallback={<SkeletonCard count={10} />}>
          <CardWrapper data={recommended} />
        </Suspense>
      </section>
    </article>
  )
}
