"use client"
import { CheckboxBlankIcon, CheckboxCheckIcon, ChevronTopIcon, CloseIcon } from "@/components/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WorkCategory, WorkTaskScope } from "@/types/work.types"

interface WorkFilterProps {
  categories: WorkCategory[]
  taskScopes: WorkTaskScope[]
  selectedCategory: string
  selectedTaskScopes: WorkTaskScope[]
  onCategoryChange: (category: string) => void
  onTaskScopeChange: (taskScopes: WorkTaskScope[]) => void
}

export const WorkFilter = ({
  categories,
  taskScopes,
  selectedCategory,
  selectedTaskScopes,
  onCategoryChange,
  onTaskScopeChange,
}: WorkFilterProps) => {
  return (
    <div className="mb-12 space-y-8">
      {/* Category Filter */}

      <Tabs defaultValue={selectedCategory} onValueChange={onCategoryChange} className="mx-auto">
        <TabsList>
          {categories.map((category) => {
            return (
              <TabsTrigger key={category.code} value={category.code}>
                {category.name}
                <span className="text-caption">{category.value}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {/* Task Scope Filter */}
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger className="shadow-2 flex-center gap-3 rounded-full border border-gray-400 bg-gray-100 py-2 pr-5 pl-6 text-gray-600 transition-all duration-300 ease-in-out data-[state=open]:[&>svg]:rotate-180">
            필터 <ChevronTopIcon className="size-4" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-y-5" align="start" sideOffset={10}>
            {taskScopes.map((scope) => {
              const isSelected = selectedTaskScopes.includes(scope)
              return (
                <button
                  key={scope.code}
                  onClick={() => onTaskScopeChange([...selectedTaskScopes, scope])}
                  className="flex items-center gap-2"
                >
                  {isSelected ? <CheckboxCheckIcon /> : <CheckboxBlankIcon />}
                  <span>{scope.name}</span>
                  <span className="text-body-2 text-gray-500">{scope.value}</span>
                </button>
              )
            })}
          </PopoverContent>
        </Popover>
        <ul className="flex items-center gap-3">
          {selectedTaskScopes.map((scope) => {
            return (
              <li
                key={scope.code}
                onClick={() => onTaskScopeChange(selectedTaskScopes.filter((s) => s.code !== scope.code))}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-black/70 py-2 pr-4 pl-5.5 text-white hover:bg-black"
              >
                <span className="text-body-2">{scope.name}</span>
                <CloseIcon className="size-4" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
