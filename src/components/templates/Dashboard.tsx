export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr]">
      <header>navbar</header>
      <main>{children}</main>
    </div>
  )
}
