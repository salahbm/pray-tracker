import { useTranslations } from "next-intl"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FormFieldWrapperProps {
  title: string
  required?: boolean
  optional?: boolean
  multiple?: boolean
  description?: string
  error?: string
  children: ReactNode
}

export const FormFieldWrapper = ({
  title,
  required = false,
  optional = false,
  multiple = false,
  description,
  error,
  children,
}: FormFieldWrapperProps) => {
  const t = useTranslations()
  return (
    <div>
      <div className="mb-3 flex flex-col md:flex-row md:items-center">
        <h3 className="typo-subtitle">{title}</h3>
        {required && (
          <span className={cn("typo-body-1 ml-3", error ? "text-red-500" : "text-primary-100")}>
            {error || t("request.required")}
          </span>
        )}
        {optional && <span className="typo-body-1 ml-3 text-black/20">{t("request.optional")}</span>}
      </div>
      {multiple && <p className="typo-body-1 mb-6 text-black/20">{t("request.multiple")}</p>}
      {description && <p className="typo-body-1 mb-6 text-black">{description}</p>}
      {children}
    </div>
  )
}
