import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import "@testing-library/jest-dom"

import { Button } from "./button"

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("renders a button by default", () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole("button")
    expect(btn.tagName).toBe("BUTTON")
  })

  it("applies default variant classes", () => {
    render(<Button>Default</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("bg-primary-200")
    expect(btn).toHaveClass("rounded-full")
  })

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("border")
    expect(btn).toHaveClass("bg-transparent")
  })

  it("applies link variant classes", () => {
    render(<Button variant="link">Link</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("hover:underline")
  })

  it("supports asChild rendering", () => {
    render(
      <Button asChild>
        <a href="/test">Go</a>
      </Button>
    )

    const link = screen.getByRole("link")
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/test")
    expect(link).toHaveAttribute("data-slot", "button")
  })

  it("merges custom className", () => {
    render(<Button className="custom-class">Custom</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("custom-class")
  })

  it("passes native props", () => {
    render(
      <Button disabled aria-label="save">
        Save
      </Button>
    )

    const btn = screen.getByRole("button")
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute("aria-label", "save")
  })
})
