"use client"

import { useState, useCallback, useEffect } from "react"
import { Toolbar } from "./toolbar"
import { FormulaBar } from "./formula-bar"
import { Grid } from "./grid"
import type { CellData, CellPosition } from "@/types/spreadsheet"

export function Spreadsheet() {
  const [cells, setCells] = useState<Record<string, CellData>>({})
  const [selectedCell, setSelectedCell] = useState<CellPosition>({ row: 0, col: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [formulaValue, setFormulaValue] = useState("")

  const getCellKey = useCallback((row: number, col: number) => `${row}-${col}`, [])

  const getCellData = useCallback(
    (row: number, col: number): CellData => {
      const key = getCellKey(row, col)
      return cells[key] || { value: "", formula: "", type: "text" }
    },
    [cells, getCellKey],
  )

  const updateCell = useCallback(
    (row: number, col: number, data: Partial<CellData>) => {
      const key = getCellKey(row, col)
      setCells((prev) => ({
        ...prev,
        [key]: { ...getCellData(row, col), ...data },
      }))
    },
    [getCellKey, getCellData],
  )

  const handleCellSelect = useCallback(
    (row: number, col: number) => {
      setSelectedCell({ row, col })
      setIsEditing(false)
      const cellData = getCellData(row, col)
      setFormulaValue(cellData.formula || cellData.value)
    },
    [getCellData],
  )

  const handleCellEdit = useCallback(
    (row: number, col: number, value: string) => {
      updateCell(row, col, { value, formula: value.startsWith("=") ? value : "" })
      setFormulaValue(value)
    },
    [updateCell],
  )

  const handleFormulaChange = useCallback(
    (value: string) => {
      setFormulaValue(value)
      updateCell(selectedCell.row, selectedCell.col, {
        value,
        formula: value.startsWith("=") ? value : "",
      })
    },
    [selectedCell, updateCell],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isEditing) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          setSelectedCell((prev) => ({ ...prev, row: Math.max(0, prev.row - 1) }))
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedCell((prev) => ({ ...prev, row: Math.min(99, prev.row + 1) }))
          break
        case "ArrowLeft":
          e.preventDefault()
          setSelectedCell((prev) => ({ ...prev, col: Math.max(0, prev.col - 1) }))
          break
        case "ArrowRight":
          e.preventDefault()
          setSelectedCell((prev) => ({ ...prev, col: Math.min(25, prev.col + 1) }))
          break
        case "Enter":
          e.preventDefault()
          setIsEditing(true)
          break
        case "Escape":
          e.preventDefault()
          setIsEditing(false)
          break
      }
    },
    [isEditing],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const cellData = getCellData(selectedCell.row, selectedCell.col)
    setFormulaValue(cellData.formula || cellData.value)
  }, [selectedCell, getCellData])

  return (
    <div className="flex flex-col h-screen bg-white">
      <Toolbar />
      <FormulaBar value={formulaValue} onChange={handleFormulaChange} selectedCell={selectedCell} />
      <div className="flex-1 overflow-hidden">
        <Grid
          cells={cells}
          selectedCell={selectedCell}
          isEditing={isEditing}
          onCellSelect={handleCellSelect}
          onCellEdit={handleCellEdit}
          onEditingChange={setIsEditing}
          getCellData={getCellData}
        />
      </div>
    </div>
  )
}
