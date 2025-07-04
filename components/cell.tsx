"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { CellData } from "@/types/spreadsheet"

interface CellProps {
  row: number
  col: number
  data: CellData
  isSelected: boolean
  isEditing: boolean
  width: number
  height: number
  onSelect: () => void
  onEdit: (value: string) => void
  onEditingChange: (editing: boolean) => void
}

export function Cell({
  row,
  col,
  data,
  isSelected,
  isEditing,
  width,
  height,
  onSelect,
  onEdit,
  onEditingChange,
}: CellProps) {
  const [editValue, setEditValue] = useState(data.value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditValue(data.value)
  }, [data.value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    onEditingChange(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onEdit(editValue)
      onEditingChange(false)
    } else if (e.key === "Escape") {
      e.preventDefault()
      setEditValue(data.value)
      onEditingChange(false)
    }
  }

  const handleBlur = () => {
    onEdit(editValue)
    onEditingChange(false)
  }

  const displayValue = data.formula && data.formula.startsWith("=") ? data.formula : data.value

  return (
    <div
      className={`
        relative border-r border-gray-200 cursor-cell flex items-center px-2
        ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"}
        ${isEditing ? "ring-2 ring-blue-500" : ""}
      `}
      style={{ width, height }}
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-full bg-transparent border-none outline-none text-sm"
        />
      ) : (
        <span className="text-sm truncate w-full">{displayValue}</span>
      )}
    </div>
  )
}
