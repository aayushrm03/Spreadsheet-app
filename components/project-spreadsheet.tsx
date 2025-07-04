"use client"

import { useState } from "react"
import { Header } from "./header"
import { Toolbar } from "./project-toolbar"
import { ProjectTable } from "./project-table"

export function ProjectSpreadsheet() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">Spreadsheet style</h1>
        <Toolbar />
        <ProjectTable selectedRows={selectedRows} onRowSelect={setSelectedRows} />
      </div>
    </div>
  )
}
