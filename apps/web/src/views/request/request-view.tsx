"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Fragment, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ArrowRightIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRequestFilters, useSendMail, useUploadFile } from "@/hooks/request"
import { type RequestFormData, requestSchema } from "@/lib/validations/request.schema"
import type { RequestFilters } from "@/types/request.types"
import {
  AgreementCheckbox,
  DatePicker,
  FileList,
  FormFieldWrapper,
  FormSection,
  OptionButton,
  PrivacyModal,
  ProgressNavigation,
  RequestHeader,
} from "./components"

interface RequestViewProps {
  initialFilters?: RequestFilters
}

const NAVIGATION_STEPS = ["summary", "scope", "developType", "detail", "clientInfo"]

export const RequestView = ({ initialFilters }: RequestViewProps) => {
  const t = useTranslations()
  const [activeSection, setActiveSection] = useState(0)
  const [isNavSticky, setIsNavSticky] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [fileNames, setFileNames] = useState<string[]>([])
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)

  // Hooks for data fetching and mutations
  const { data: filters } = useRequestFilters(initialFilters)
  const { mutateAsync: uploadFileMutation, isPending: isUploadPending } = useUploadFile()
  const { mutateAsync: sendMailMutation, isPending: isSendPending } = useSendMail()

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    // @ts-expect-error zodResolver type error
    resolver: zodResolver(requestSchema),
    defaultValues: {
      category: [],
      form: [],
      taskScope: [],
      developType: [],
      county: [],
      budget: "",
      period: "",
      periodStartDate: "",
      choiceType: "",
      title: "",
      logline: "",
      detailContent: "",
      fileUrl: "",
      company: "",
      nameplate: "",
      email: "",
      tel: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  const watchedValues = watch()

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRefs.current[0]) {
        const rect = sectionRefs.current[0].getBoundingClientRect()
        setIsNavSticky(rect.top < window.innerWidth * 0.2)
      }

      // Update active section
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          if (rect.top < 250) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      const top = sectionRefs.current[index]!.offsetTop - 200
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const handleSelectOption = (field: keyof RequestFormData, value: string) => {
    setValue(field, value as never)
  }

  const handleMultiSelectOption = (field: keyof RequestFormData, value: string) => {
    const currentValues = watchedValues[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    setValue(field, newValues as never)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 2 || fileNames.length >= 2) {
      toast.error(t("request.fileAlert"))
      return
    }

    for (const file of files) {
      if (fileNames.length >= 2) break

      try {
        const formData = new FormData()
        formData.append("file", file)

        const url = await uploadFileMutation(formData)
        setFileNames((prev) => [...prev, file.name])
        setValue("fileUrl", url as unknown as string)
      } catch {
        toast.error(t("request.fileFormatAlert"))
      }
    }
    e.target.value = ""
  }

  const deleteFile = (index: number) => {
    setFileNames((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: RequestFormData) => {
    if (!isAgreementChecked) {
      toast.error(t("request.agreement.required"))
      return
    }

    try {
      await sendMailMutation(data)
      toast.success(t("request.success"))
      reset()
    } catch {
      toast.error(t("request.error"))
    }
  }

  return (
    <Fragment>
      <RequestHeader />
      <div className="bg-gray-200 pt-12 pb-36 md:pt-20 md:pb-44 lg:pt-30">
        {/* Title */}
        <h1 className="typo-title-2 mb-12 text-center lg:mx-auto lg:max-w-screen-lg lg:text-start">
          {t("request.title")}
        </h1>

        {/* Progress Navigation */}
        <ProgressNavigation
          steps={NAVIGATION_STEPS}
          activeSection={activeSection}
          isSticky={isNavSticky}
          onStepClick={scrollToSection}
        />

        {/* Form Content */}
        <form
          // @ts-expect-error - React Hook Form type inference issue with generic TFieldValues
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-12 flex flex-col gap-y-20 px-5 md:mt-16 md:px-8 lg:max-w-screen-lg lg:px-0 lg:pt-40"
        >
          {/* Section 1: Category & Form */}
          <FormSection sectionRef={(el) => (sectionRefs.current[0] = el)}>
            <FormFieldWrapper title={t("request.fields.category")} required multiple error={errors.category?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.category?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={(watchedValues.category as string[])?.includes(item.code)}
                    onClick={() => handleMultiSelectOption("category", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper title={t("request.fields.form")} required multiple error={errors.form?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.form?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={(watchedValues.form as string[])?.includes(item.code)}
                    onClick={() => handleMultiSelectOption("form", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>
          </FormSection>

          {/* Section 2: Task Scope, Development Type & County */}
          <FormSection sectionRef={(el) => (sectionRefs.current[1] = el)}>
            <FormFieldWrapper title={t("request.fields.taskScope")} required multiple error={errors.taskScope?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.taskScope?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={(watchedValues.taskScope as string[])?.includes(item.code)}
                    onClick={() => handleMultiSelectOption("taskScope", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper
              title={t("request.fields.developType")}
              required
              multiple
              error={errors.developType?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.developType?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={(watchedValues.developType as string[])?.includes(item.code)}
                    onClick={() => handleMultiSelectOption("developType", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper title={t("request.fields.county")} required multiple error={errors.county?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.county?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={(watchedValues.county as string[])?.includes(item.code)}
                    onClick={() => handleMultiSelectOption("county", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>
          </FormSection>

          {/* Section 3: Budget, Period & Choice Type */}
          <FormSection sectionRef={(el) => (sectionRefs.current[2] = el)}>
            <FormFieldWrapper title={t("request.fields.budget")} required error={errors.budget?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.budget?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={watchedValues.budget === item.code}
                    onClick={() => handleSelectOption("budget", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper title={t("request.fields.period")} required error={errors.period?.message}>
              <div className="mb-6">
                <p className="typo-body-1 mb-4 text-black">{t("request.projectStartDate")}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <DatePicker
                    value={watchedValues.periodStartDate}
                    onChange={(date) => setValue("periodStartDate", date)}
                    placeholder={t("request.placeholders.selectDate")}
                  />
                  <OptionButton
                    onClick={() => setValue("periodStartDate", "undecided")}
                    label={t("request.buttons.undecided")}
                    active={watchedValues.periodStartDate === "undecided"}
                  />
                </div>
              </div>
              <div>
                <p className="typo-body-1 mb-4 text-black">{t("request.projectPeriod")}</p>
                <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                  {filters?.period?.map((item) => (
                    <OptionButton
                      key={item.code}
                      label={item.name}
                      active={watchedValues.period === item.code}
                      onClick={() => handleSelectOption("period", item.code)}
                    />
                  ))}
                </div>
              </div>
            </FormFieldWrapper>

            <FormFieldWrapper title={t("request.fields.choiceType")} required error={errors.choiceType?.message}>
              <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-x-4">
                {filters?.choiceType?.map((item) => (
                  <OptionButton
                    key={item.code}
                    label={item.name}
                    active={watchedValues.choiceType === item.code}
                    onClick={() => handleSelectOption("choiceType", item.code)}
                  />
                ))}
              </div>
            </FormFieldWrapper>
          </FormSection>

          {/* Section 4: Project Details */}
          <FormSection sectionRef={(el) => (sectionRefs.current[3] = el)}>
            <FormFieldWrapper title={t("request.fields.title")} optional>
              <Input {...register("title")} placeholder={t("request.placeholders.title")} />
            </FormFieldWrapper>

            <FormFieldWrapper title={t("request.fields.logline")} optional>
              <Input {...register("logline")} placeholder={t("request.placeholders.logline")} />
            </FormFieldWrapper>

            <FormFieldWrapper
              required
              title={t("request.fields.detailContent")}
              description={t("request.detailContent")}
              error={errors.detailContent?.message}
            >
              <div className="aria-invalid:ring-destructive/20 aria-invalid:border-destructive relative min-h-95 overflow-y-auto rounded-2xl border-[0.5px] border-black bg-transparent px-7 py-6 [scrollbar-color:transparent] [scrollbar-width:none] focus:border-b-[1.5px]">
                <textarea
                  data-slot="textarea"
                  className="placeholder:typo-body-2 typo-body-1 min-h-95 w-full text-black ring-0 outline-0 [scrollbar-color:transparent] [scrollbar-width:none] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("detailContent")}
                  placeholder={t("request.placeholders.detailContent")}
                />
                <FileList fileNames={fileNames} onFileDelete={deleteFile} />
              </div>
              {/* Upload Button */}
              <div className="mt-4 flex flex-col items-start gap-2 md:flex-row md:items-center">
                <Button variant="file" type="button" onClick={() => fileInputRef.current?.click()}>
                  {t("request.buttons.fileUpload")}
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.hwp,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                  multiple
                  className="hidden"
                />

                <span className="typo-body-2 text-gray-600">{t("request.fileFormats")}</span>
              </div>
            </FormFieldWrapper>
          </FormSection>

          {/* Section 5: Client Info */}
          <FormSection sectionRef={(el) => (sectionRefs.current[4] = el)}>
            <FormFieldWrapper title={t("request.fields.clientInfo")} required>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-8 md:gap-y-2 md:pr-15">
                <div>
                  <Input {...register("company")} placeholder={t("request.placeholders.company")} />
                  {errors.company && <p className="typo-body-2 mt-1 text-red-500">{errors.company.message}</p>}
                </div>
                <div>
                  <Input {...register("nameplate")} placeholder={t("request.placeholders.nameplate")} />
                  {errors.nameplate && <p className="typo-body-2 mt-1 text-red-500">{errors.nameplate.message}</p>}
                </div>
                <div>
                  <Input {...register("email")} placeholder={t("request.placeholders.email")} />
                  {errors.email && <p className="typo-body-2 mt-1 text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <Input {...register("tel")} type="tel" placeholder={t("request.placeholders.tel")} />
                  {errors.tel && <p className="typo-body-2 mt-1 text-red-500">{errors.tel.message}</p>}
                </div>
              </div>
            </FormFieldWrapper>
          </FormSection>

          {/* Agreement */}
          <AgreementCheckbox
            checked={isAgreementChecked}
            onChange={setIsAgreementChecked}
            onPrivacyClick={() => setShowModal(true)}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" variant="send" disabled={isUploadPending || isSendPending}>
              <span>{t("request.buttons.send")}</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </form>
      </div>

      {/* Loading Spinner */}
      {(isUploadPending || isSendPending) && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* Privacy Modal */}
      <PrivacyModal open={showModal} onOpenChange={setShowModal} />
    </Fragment>
  )
}
