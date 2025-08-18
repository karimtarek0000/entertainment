import { getBookmarks } from '@/actions/user'
import NotFoundContent from '@/components/molecules/NotFoundContent'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Bookmarks() {
  const bookmarks = await getBookmarks()

  return (
    <section className="container">
      <h1 className="page-heading">Bookmarks</h1>

      <Suspense fallback={<SkeletonCard count={10} />}>
        {bookmarks.length > 0 ? (
          <CardWrapper data={bookmarks} />
        ) : (
          <NotFoundContent title="No bookmarks found" />
        )}
      </Suspense>
    </section>
  )
}
