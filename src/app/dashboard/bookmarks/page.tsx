import { getBookmarks } from '@/actions/user'
import NotFoundContent from '@/components/molecules/NotFoundContent'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Bookmarks({ searchParams }: PageProps) {
  const sp = await searchParams
  const query = sp.search || ''
  const bookmarks = await getBookmarks(query)

  return (
    <section className="container">
      <h1 className="page-heading">Bookmarks</h1>

      <Suspense fallback={<SkeletonCard count={10} />}>
        <NotFoundContent data={bookmarks as []} title="No bookmarks available">
          <CardWrapper data={bookmarks as []} />
        </NotFoundContent>
      </Suspense>
    </section>
  )
}
