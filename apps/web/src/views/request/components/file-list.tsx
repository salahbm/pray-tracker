import { CloseIcon } from "@/components/icons"

interface FileListProps {
  fileNames: string[]
  onFileDelete: (index: number) => void
}

export const FileList = ({ fileNames, onFileDelete }: FileListProps) => {
  if (fileNames.length === 0) return null

  return (
    <div className="mt-6 flex flex-col gap-3">
      {fileNames.map((name, index) => (
        <div key={index} className="flex items-center justify-between rounded-full bg-white px-6 py-3 lg:bg-gray-200">
          <span className="typo-body-2 max-w-[85%] truncate">{name}</span>
          <button type="button" onClick={() => onFileDelete(index)}>
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
