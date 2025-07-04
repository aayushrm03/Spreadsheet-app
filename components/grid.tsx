"use client"

import { useRef, useState } from "react"
import { Cell } from "./cell"
import type { CellData, CellPosition } from "@/types/spreadsheet"

interface GridProps {
  cells: Record<string, CellData>
  selectedCell: CellPosition
  isEditing: boolean
  onCellSelect: (row: number, col: number) => void
  onCellEdit: (row: number, col: number, value: string) => void
  onEditingChange: (editing: boolean) => void
  getCellData: (row: number, col: number) => CellData
}

export function Grid({
  cells,
  selectedCell,
  isEditing,
  onCellSelect,
  onCellEdit,
  onEditingChange,
  getCellData,
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columnWidths, setColumnWidths] = useState<Record<number, number>>({})

  const ROWS = 100
  const COLS = 26
  const DEFAULT_CELL_WIDTH = 100
  const CELL_HEIGHT = 32
  const HEADER_HEIGHT = 32

  const getColumnLetter = (col: number) => String.fromCharCode(65 + col)

  const handleColumnResize = (col: number, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [col]: width }))
  }

  const getColumnWidth = (col: number) => columnWidths[col] || DEFAULT_CELL_WIDTH

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex border-b border-gray-300 bg-gray-50">
        {/* Corner cell */}
        <div
          className="flex items-center justify-center border-r border-gray-300 bg-gray-100 text-xs font-medium text-gray-600"
          style={{ width: 48, height: HEADER_HEIGHT }}
        />

        {/* Column headers */}
        {Array.from({ length: COLS }, (_, col) => (
          <div
            key={col}
            className="flex items-center justify-center border-r border-gray-300 bg-gray-100 text-xs font-medium text-gray-600 relative group"
            style={{ width: getColumnWidth(col), height: HEADER_HEIGHT }}
          >
            {getColumnLetter(col)}
            <div
              className="absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500 opacity-0 group-hover:opacity-100"
              onMouseDown={(e) => {
                e.preventDefault()
                const startX = e.clientX
                const startWidth = getColumnWidth(col)

                const handleMouseMove = (e: MouseEvent) => {
                  const newWidth = Math.max(50, startWidth + (e.clientX - startX))
                  handleColumnResize(col, newWidth)
                }

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove)
                  document.removeEventListener("mouseup", handleMouseUp)
                }

                document.addEventListener("mousemove", handleMouseMove)
                document.addEventListener("mouseup", handleMouseUp)
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto" ref={gridRef}>
        <div className="relative">
          {Array.from({ length: ROWS }, (_, row) => (
            <div key={row} className="flex border-b border-gray-200">
              {/* Row header */}
              <div
                className="flex items-center justify-center border-r border-gray-300 bg-gray-100 text-xs font-medium text-gray-600"
                style={{ width: 48, height: CELL_HEIGHT }}
              >
                {row + 1}
              </div>

              {/* Cells */}
              {Array.from({ length: COLS }, (_, col) => (
                <Cell
                  key={`${row}-${col}`}
                  row={row}
                  col={col}
                  data={getCellData(row, col)}
                  isSelected={selectedCell.row === row && selectedCell.col === col}
                  isEditing={isEditing && selectedCell.row === row && selectedCell.col === col}
                  width={getColumnWidth(col)}
                  height={CELL_HEIGHT}
                  onSelect={() => onCellSelect(row, col)}
                  onEdit={(value) => onCellEdit(row, col, value)}
                  onEditingChange={onEditingChange}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
