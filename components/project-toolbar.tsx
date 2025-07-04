"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, EyeOff, ArrowUpDown, Filter, Download, Upload, Share, Plus } from "lucide-react"

export function Toolbar() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Tool bar</span>
          <ChevronRight className="h-4 w-4" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <EyeOff className="h-4 w-4 mr-1" />
            Hide fields
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-600">
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Sort
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-600">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Download className="h-4 w-4 mr-1" />
          Import
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-600">
          <Upload className="h-4 w-4 mr-1" />
          Export
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-600">
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>

        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-1" />
          New Action
        </Button>
      </div>
    </div>
  )
}
