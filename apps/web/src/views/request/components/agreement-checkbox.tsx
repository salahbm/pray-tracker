import { useTranslations } from "next-intl"
import { CheckboxBlankIcon, CheckboxCheckIcon } from "@/components/icons"

interface AgreementCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  onPrivacyClick: () => void
}

export const AgreementCheckbox = ({ checked, onChange, onPrivacyClick }: AgreementCheckboxProps) => {
  const t = useTranslations()

  return (
    <div className="typo-body-2 mb-20 flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className="flex items-center justify-center"
          aria-label="Agreement checkbox"
        >
          {checked ? <CheckboxCheckIcon className="h-5 w-5" /> : <CheckboxBlankIcon className="h-5 w-5" />}
        </button>
        <label
          htmlFor="agree"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onPrivacyClick()
          }}
        >
          {t.rich("request.agreement.text", {
            underline: (chunks) => <span className="cursor-pointer border-b border-black">{chunks}</span>,
          })}
        </label>
      </div>
    </div>
  )
}
