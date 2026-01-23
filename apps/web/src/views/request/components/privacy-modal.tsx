import { useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PrivacyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PrivacyModal = ({ open, onOpenChange }: PrivacyModalProps) => {
  const t = useTranslations()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-10rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl bg-white p-10 max-md:rounded-lg max-md:p-6 max-md:pt-13 md:max-w-[632px] md:rounded-xl md:p-8">
        <DialogHeader>
          <DialogTitle className="typo-subtitle mb-3">{t("request.privacy.title")}</DialogTitle>
          <DialogDescription className="typo-body-2 mb-9 text-black/20">
            {t("request.privacy.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="typo-body-1 mb-2">{t("request.privacy.section1.title")}</h3>
            <p className="typo-body-2 whitespace-pre-line text-black/40">{t("request.privacy.section1.content")}</p>
          </div>
          <div>
            <h3 className="typo-body-1 mb-2">{t("request.privacy.section2.title")}</h3>
            <p className="typo-body-2 whitespace-pre-line text-black/40">{t("request.privacy.section2.content")}</p>
          </div>
          <div>
            <h3 className="typo-body-1 mb-2">{t("request.privacy.section3.title")}</h3>
            <p className="typo-body-2 whitespace-pre-line text-black/40">{t("request.privacy.section3.content")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
