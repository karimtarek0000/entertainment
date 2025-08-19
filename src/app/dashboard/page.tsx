import { getCategories } from '@/actions/resourcess'
import NotFoundContent from '@/components/molecules/NotFoundContent'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Dashboard({ searchParams }: PageProps) {
  const sp = await searchParams
  const query = sp.search || ''
  const { trending, recommended } = await getCategories(query)

  return (
    <article className="container space-y-6">
      <section>
        <h1 className="page-heading">Trending</h1>

        <Suspense fallback={<SkeletonCard count={10} />}>
          <NotFoundContent
            data={trending as []}
            title="No trending available"
            type="all"
          >
            <CardWrapper data={trending as []} />
          </NotFoundContent>
        </Suspense>
      </section>

      <section>
        <h2 className="page-heading">Recommended for you</h2>

        <Suspense fallback={<SkeletonCard count={10} />}>
          <NotFoundContent
            data={recommended as []}
            title="No recommended available"
            type="all"
          >
            <CardWrapper data={recommended as []} />
          </NotFoundContent>
        </Suspense>
      </section>
    </article>
  )
}
