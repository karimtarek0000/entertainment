import Button, { variants } from '@/components/atoms/Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('Button accept children', () => {
    render(<Button>Click Me</Button>)
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument()
  })

  it('Button apply attrs like onClick and type', async () => {
    const clickHandler = vi.fn()

    render(
      <Button onClick={clickHandler} type="submit">
        Click Me
      </Button>,
    )

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    await userEvent.click(screen.getByRole('button'))
    expect(clickHandler).toHaveBeenCalledOnce()
  })

  it('Button apply variants correctly', async () => {
    for (const [key, value] of Object.entries(variants)) {
      render(<Button variant={key as keyof typeof variants}>Click Me</Button>)
      expect(screen.getByTestId(key)).toHaveClass(value)
    }
  })
})
