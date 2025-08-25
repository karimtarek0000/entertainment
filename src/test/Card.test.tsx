import Card from '@/components/molecules/Card'
import * as services from '@/services'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import React from 'react'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('@/services', () => ({
  updateBookmarkStatus: vi.fn(),
}))

vi.mock('@/components/atoms/Button', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('@/components/molecules/RenderSVG', () => ({
  __esModule: true,
  default: ({ name, ...props }: any) => <svg data-testid={name} {...props} />,
}))

const baseData = {
  year: 2023,
  type: 'Movie',
  rating: 'PG',
  title: 'Test Movie',
  isBookmarked: false,
}

describe('Card', () => {
  ;(usePathname as any).mockReturnValue('/test-path')

  it('renders card content and children', () => {
    render(
      <Card data={baseData as CardWrapperData}>
        <div data-testid="child-content">Child</div>
      </Card>,
    )
    expect(screen.getByTestId('card-title')).toMatchInlineSnapshot(`
      <h2
        class="mt-1 text-head-xs md:text-head-sm font-medium"
        data-testid="card-title"
      >
        Test Movie
      </h2>
    `)
    expect(screen.getByTestId('card-info')).toMatchInlineSnapshot(`
      <figure
        class="flex items-center gap-x-1 text-fifth text-[11px] md:text-para-sm"
        data-testid="card-info"
      >
        2023
         ·
         
        <svg
          class="fill-fifth size-2.5"
          data-testid="movies"
        />
         
        Movie
         · 
        PG
      </figure>
    `)
  })

  it('renders correct SVG icon for Movie', () => {
    render(<Card data={baseData as CardWrapperData}>child</Card>)
    expect(screen.getByTestId('movies')).toBeInTheDocument()
  })

  it('renders correct SVG icon for TV Series', () => {
    render(
      <Card data={{ ...(baseData as CardWrapperData), type: 'TV Series' }}>
        child
      </Card>,
    )
    expect(screen.getByTestId('series')).toBeInTheDocument()
  })

  it('shows unactive-bookmark icon when not bookmarked', () => {
    render(<Card data={baseData as CardWrapperData}>child</Card>)
    expect(screen.getByTestId('unactive-bookmark')).toBeInTheDocument()
  })

  it('shows active-bookmark icon when bookmarked', () => {
    render(
      <Card data={{ ...(baseData as CardWrapperData), isBookmarked: true }}>
        child
      </Card>,
    )
    expect(screen.getByTestId('active-bookmark')).toBeInTheDocument()
  })

  it('toggles bookmark state and calls updateBookmarkStatus', async () => {
    render(<Card data={baseData as CardWrapperData}>child</Card>)

    userEvent.click(screen.getByTestId('bookmark-button'))

    await waitFor(() => {
      expect(services.updateBookmarkStatus).toHaveBeenCalledWith(
        baseData,
        false,
        '/test-path',
      )
    })

    // After click, icon should change to active-bookmark
    expect(screen.getByTestId('active-bookmark')).toBeInTheDocument()
  })

  it('toggles bookmark state back and forth', async () => {
    render(<Card data={baseData as CardWrapperData}>child</Card>)
    const button = screen.getByRole('button')
    // First click: not bookmarked -> bookmarked
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByTestId('active-bookmark')).toBeInTheDocument()
    })
    // Second click: bookmarked -> not bookmarked
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByTestId('unactive-bookmark')).toBeInTheDocument()
    })
  })
})
