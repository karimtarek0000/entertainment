import RenderSVG from '@/components/molecules/RenderSVG'
import { PropsWithChildren } from 'react'

interface NotFoundDetails extends PropsWithChildren {
  title: string
  type?: string
  data: []
}

export default function NotFoundContent({
  title,
  type = 'bookmarks',
  data,
  children,
}: NotFoundDetails) {
  return (
    <>
      {data.length ? (
        children
      ) : (
        <div className="flex-center flex-col h-[18.75rem]">
          <RenderSVG name={type} size="70" className="fill-white" />
          <p className="mt-5">{title}</p>
        </div>
      )}
    </>
  )
}
