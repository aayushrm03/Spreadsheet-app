"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface ProjectRow {
  id: number
  jobRequest: string
  submitDate: string
  submitter: string
  url: string
  assigned: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  estValue: string
  status?: string
}

const projectData: ProjectRow[] = [
  {
    id: 1,
    jobRequest: "Launch social media campaign for product launch",
    submitDate: "15-11-2024",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "5,200,000",
    status: "In progress",
  },
  {
    id: 2,
    jobRequest: "Update press kit for company redesign",
    submitDate: "28-10-2024",
    submitter: "Irfan Khan",
    url: "www.irfankhan.com",
    assigned: "Tejal Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500,000",
    status: "Need to start",
  },
  {
    id: 3,
    jobRequest: "Finalize user testing feedback for app redesign",
    submitDate: "05-12-2024",
    submitter: "Mark Johnson",
    url: "www.markjohnson.com",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750,000",
    status: "In progress",
  },
  {
    id: 4,
    jobRequest: "Design new features for the website",
    submitDate: "10-01-2025",
    submitter: "Emily Green",
    url: "www.emilygreen.com",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,900,000",
    status: "Complete",
  },
  {
    id: 5,
    jobRequest: "Prepare financial report for Q4",
    submitDate: "25-01-2025",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.com",
    assigned: "Kevin Smith",
    priority: "High",
    dueDate: "30-01-2025",
    estValue: "2,800,000",
    status: "Blocked",
  },
]

interface ProjectTableProps {
  selectedRows: number[]
  onRowSelect: (rows: number[]) => void
}

export function ProjectTable({ selectedRows, onRowSelect }: ProjectTableProps) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "In progress":
        return "bg-blue-100 text-blue-800"
      case "Need to start":
        return "bg-orange-100 text-orange-800"
      case "Blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header Row */}
      <div className="bg-blue-50 border-b border-gray-200">
        <div className="grid grid-cols-8 gap-4 px-4 py-3 text-sm font-medium text-gray-700">
          <div className="col-span-3">📝 Job Request</div>
          <div className="col-span-1">📅 Submit</div>
          <div className="col-span-1">👤 Submitter</div>
          <div className="col-span-1">🔗 URL</div>
          <div className="col-span-1">👥 Assigned</div>
          <div className="col-span-1">⚡ Priority</div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-b border-gray-200">
        <div className="col-span-1">📅 Due Date</div>
        <div className="col-span-1">💰 Est. Value</div>
        <div className="col-span-2"></div>
      </div>

      {/* Data Rows */}
      {projectData.map((row, index) => (
        <>
          <div
            key={row.id}
            className={`grid grid-cols-8 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
              selectedRows.includes(row.id) ? "bg-blue-50" : ""
            }`}
          >
            <div className="col-span-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{row.id}</span>
                <span className="text-sm">{row.jobRequest}</span>
              </div>
            </div>
            <div className="col-span-1 text-sm text-gray-600">{row.submitDate}</div>
            <div className="col-span-1 text-sm">{row.submitter}</div>
            <div className="col-span-1">
              <a href={`https://${row.url}`} className="text-blue-600 text-sm hover:underline truncate block">
                {row.url}
              </a>
            </div>
            <div className="col-span-1 text-sm">{row.assigned}</div>
            <div className="col-span-1">
              <Badge className={`${getPriorityColor(row.priority)} text-xs`}>{row.priority}</Badge>
            </div>
          </div>

          <div key={`${row.id}-details`} className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-100">
            <div className="col-span-1 text-sm text-gray-600">{row.dueDate}</div>
            <div className="col-span-1 text-sm font-medium">{row.estValue}</div>
            <div className="col-span-2">
              {row.status && <Badge className={`${getStatusColor(row.status)} text-xs`}>{row.status}</Badge>}
            </div>
          </div>
        </>
      ))}

      {/* Empty Rows */}
      {Array.from({ length: 15 }, (_, i) => (
        <div key={`empty-${i}`} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
          <div className="col-span-1">
            <span className="text-gray-400 text-sm">{projectData.length + i + 1}</span>
          </div>
          <div className="col-span-11"></div>
        </div>
      ))}
    </div>
  )
}
