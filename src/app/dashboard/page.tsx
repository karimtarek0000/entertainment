import CardWrapper from '@/components/organisms/CardWrapper'

export default function Dashboard() {
  return (
    <>
      <section className="container">
        <h1 className="text-head-sm md:text-head-lg mb-6">
          Recommended for you
        </h1>

        <CardWrapper />
      </section>
    </>
  )
}
