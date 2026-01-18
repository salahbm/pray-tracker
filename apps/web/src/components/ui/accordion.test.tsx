import { fireEvent, render, screen } from "@testing-library/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

describe("Accordion", () => {
  it("toggles content visibility", () => {
    render(
      <Accordion>
        <AccordionItem value="one">
          <AccordionTrigger value="one">One</AccordionTrigger>
          <AccordionContent value="one">Hello</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    expect(screen.queryByText("Hello")).toBeNull()

    fireEvent.click(screen.getByText("One"))
    expect(screen.getByText("Hello")).toBeInTheDocument()

    fireEvent.click(screen.getByText("One"))
    expect(screen.queryByText("Hello")).toBeNull()
  })
})
