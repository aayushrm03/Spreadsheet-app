"use client"

import { useRef, useEffect } from "react"
import type { CellPosition } from "@/types/spreadsheet"

interface FormulaBarProps {
  value: string
  onChange: (value: string) => void
  selectedCell: CellPosition
}

export function FormulaBar({ value, onChange, selectedCell }: FormulaBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const getCellReference = (row: number, col: number) => {
    const colLetter = String.fromCharCode(65 + col)
    return `${colLetter}${row + 1}`
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedCell])

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 min-w-[80px]">
          <span className="text-sm font-medium text-gray-600">
            {getCellReference(selectedCell.row, selectedCell.col)}
          </span>
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter formula or value..."
          />
        </div>
      </div>
    </div>
  )
}
