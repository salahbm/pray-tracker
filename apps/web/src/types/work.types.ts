export interface WorkCategory {
  code: string
  name: string
  value: string
}

export interface WorkTaskScope {
  code: string
  name: string
  value: string
}

export interface WorkTextColor {
  code: string
  name: string
}

export interface WorkRelated {
  code: string
  name: string
  value: string
  category: string
  lang: string
  strList: string[]
  voList: WorkTextColor[]
}

export interface Work {
  workNo: number
  isShow: number
  isPublic: number
  isDetail: number
  priority: number
  createAt: string
  updateAt: string
  lang: string
  thum: string
  thumA: string
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
  tag: string
  categoryList: WorkCategory[]
  taskScopeList: WorkTaskScope[]
  relatedList: WorkRelated[]
  textColorList: WorkTextColor[]
}

export interface WorkFilterData {
  taskScopeList: WorkTaskScope[]
  categoryList: WorkCategory[]
}

export interface WorkPagination {
  curPage: number
  pageList: number
  blockCnt: number
  totalCnt: number
  totalPage: number
  totalBlock: number
  curBlock: number
  blockStart: number
  blockEnd: number
  prevPage: number
  nextPage: number
  pageStart: number
}

export interface WorkListResponse {
  recommendList: Work[]
  paging: WorkPagination
  list: Work[]
}

export interface WorkDetailResponse {
  result: Work
}

export interface WorkFilterResponse {
  result: WorkFilterData
}

export interface MainWork {
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
  isPageMain: number
  priorityPageMain: number
  thumPageMain: string
  isPageService: number
  priorityPageService: number
  isPageWorks: number
  priorityPageWorks: number
  textColor: string
  textColorList: WorkTextColor[]
}
