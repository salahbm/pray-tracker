export interface ServiceItem {
  workNo: number
  isShow: number
  isPublic: number
  isDetail: number
  priority: number
  createAt: string
  updateAt: string
  lang: string
  thum: string
  useThumA: number
  title: string
  content: string
  developDate: string
  client: string
  category: string
  taskScope: string
  related: string
  isPageMain: number
  priorityPageMain: number
  thumPageMain: string
  isPageService: number
  priorityPageService: number
  isPageWorks: number
  priorityPageWorks: number
  thumBackground: string
  thumMockupPageWorks: string
  seoMetaTitle: string
  seoMetaDescription: string
  seoMetaKeyword: string
  seoOgTitle: string
  seoOgDescription: string
  seoOgImage: string
  textColor: string

  categoryList: CodeNameValue[]
  taskScopeList: CodeNameValue[]
  relatedList: RelatedItem[]
  textColorList: CodeName[]
}

export interface CodeNameValue {
  code: string
  name: string
  value: string
}

export interface CodeName {
  code: string
  name: string
}

export interface RelatedItem {
  code: string
  name: string
  value: string
  category: string
  lang: string
  strList: string[]
  voList: CodeName[]
}
