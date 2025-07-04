export interface CellData {
  value: string
  formula?: string
  type: "text" | "number" | "formula"
  style?: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    fontSize?: number
    fontFamily?: string
    color?: string
    backgroundColor?: string
    textAlign?: "left" | "center" | "right"
  }
}

export interface CellPosition {
  row: number
  col: number
}

export interface SpreadsheetState {
  cells: Record<string, CellData>
  selectedCell: CellPosition
  selectedRange?: {
    start: CellPosition
    end: CellPosition
  }
  isEditing: boolean
  history: SpreadsheetState[]
  historyIndex: number
}
