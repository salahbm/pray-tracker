import { z } from "zod"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9-+() ]+$/

// English error map for Zod v4
//@ts-expect-error zod error map type inference issue
export const enErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === "invalid_type") {
    if (issue.expected === "string") {
      return { message: "This field is required" }
    }
  }
  if (issue.code === "too_small") {
    if (issue.minimum === 1) {
      return { message: "This field is required" }
    }
    if (issue.type === "string") {
      return { message: `Must be at least ${issue.minimum} characters` }
    }
  }
  if (issue.code === "custom") {
    if (issue.params?.i18n === "email.invalid") {
      return { message: "Please enter a valid email address" }
    }
    if (issue.params?.i18n === "tel.invalid") {
      return { message: "Please enter a valid phone number" }
    }
  }
  return { message: ctx?.defaultError || "This field is required" }
}

// Korean error map for Zod v4
//@ts-expect-error zod error map type inference issue
export const koErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === "invalid_type") {
    if (issue.expected === "string") {
      return { message: "필수 입력 항목입니다" }
    }
  }
  if (issue.code === "too_small") {
    if (issue.minimum === 1) {
      return { message: "필수 입력 항목입니다" }
    }
    if (issue.type === "string") {
      return { message: `최소 ${issue.minimum}자 이상 입력해주세요` }
    }
  }
  if (issue.code === "custom") {
    if (issue.params?.i18n === "email.invalid") {
      return { message: "이메일 형식이 올바르지 않습니다." }
    }
    if (issue.params?.i18n === "tel.invalid") {
      return { message: "연락처 형식이 올바르지 않습니다." }
    }
  }
  return { message: ctx?.defaultError || "필수 입력 항목입니다" }
}

export const requestSchema = z.object({
  category: z.array(z.string()).min(1),
  form: z.array(z.string()).min(1),
  taskScope: z.array(z.string()).min(1),
  developType: z.array(z.string()).min(1),
  county: z.array(z.string()).min(1),
  budget: z.string().min(1),
  period: z.string().min(1),
  periodStartDate: z.string().optional(),
  choiceType: z.string().min(1),
  title: z.string().min(2),
  logline: z.string().min(1),
  detailContent: z.string().min(20),
  fileUrl: z.string().default(""),
  company: z.string().min(1),
  nameplate: z.string().min(1),
  email: z
    .string()
    .min(1)
    .refine((value) => EMAIL_REGEX.test(value), {
      params: {
        i18n: "email.invalid",
      },
    }),
  tel: z
    .string()
    .min(7)
    .refine((value) => PHONE_REGEX.test(value), {
      params: {
        i18n: "tel.invalid",
      },
    }),
})

export type RequestFormData = z.infer<typeof requestSchema>
