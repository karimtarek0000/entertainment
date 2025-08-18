export default function NotFoundContent({ title }: { title: string }) {
  return (
    <div className="flex-center flex-col h-[18.75rem]">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="mb-4"
      >
        <path
          d="M30 20h60c2.21 0 4 1.79 4 4v76l-34-20-34 20V24c0-2.21 1.79-4 4-4z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M45 40h30M45 55h20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p>{title}</p>
    </div>
  )
}
