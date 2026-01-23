"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { CalendarIcon, ChevronBottomIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value?: string
  onChange: (date: string) => void
  placeholder?: string
}

export const DatePicker = ({ value, onChange, placeholder }: DatePickerProps) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value ? new Date(value) : undefined)

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      onChange(date.toISOString().split("T")[0] || "")
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex items-center gap-2 px-4", !selectedDate && "text-muted-foreground")}
        >
          <CalendarIcon className="size-5" />
          {selectedDate ? selectedDate.toLocaleDateString() : placeholder || t("request.placeholders.selectDate")}
          <ChevronBottomIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} autoFocus />
      </PopoverContent>
    </Popover>
  )
}
