import { getBookmarks } from '@/actions/user'
import SkeletonCard from '@/components/molecules/skeleton/SkeletonCard'
import CardWrapper from '@/components/organisms/CardWrapper'
import { Suspense } from 'react'

export default async function Bookmarks() {
  const bookmarks = await getBookmarks()

  return (
    <section className="container">
      <h1 className="page-heading">Bookmarks</h1>

      <Suspense fallback={<SkeletonCard count={10} />}>
        <CardWrapper data={bookmarks} />
      </Suspense>
    </section>
  )
}
