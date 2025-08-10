import Navbar from '@/components/molecules/Navbar'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr]">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  )
}
