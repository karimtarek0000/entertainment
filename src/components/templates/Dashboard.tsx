import Header from '@/components/organisms/Header'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr]">
      <Header />
      <main>{children}</main>
    </div>
  )
}
