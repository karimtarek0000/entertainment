import Search from '@/components/molecules/Search'
import Header from '@/components/organisms/Header'
import { Suspense } from 'react'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[6rem_1fr]">
      <Header />

      <main>
        <Suspense>
          <Search />
        </Suspense>
        {children}
      </main>
    </div>
  )
}
