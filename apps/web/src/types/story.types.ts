export interface StoryCategory {
  code: string
  name: string
  value: string
}

export interface RelatedStory {
  code: string
  name: string
  value: string
  category: string
  strList: string[]
}

export interface Story {
  storyNo: number
  isShow: number
  isPublic: number
  priority: number
  createAt: string
  updateAt: string
  lang: string
  thum: string
  title: string
  content: string
  category: string
  seoMetaTitle: string
  seoMetaDescription: string
  seoMetaKeyword: string
  seoOgTitle: string
  seoOgDescription: string
  seoOgImage: string
  categoryList: StoryCategory[]
  relatedList: RelatedStory[]
}

export interface StoryPagination {
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

export interface StoryListResponse {
  paging: StoryPagination
  list: Story[]
}

export interface StoryDetailResponse {
  result: Story
}

export interface StoryFilterResponse {
  result: {
    storyCategory: StoryCategory[]
  }
}
