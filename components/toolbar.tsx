"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  FlagIcon as BorderAll,
  Undo,
  Redo,
  Copy,
  ClipboardPasteIcon as Paste,
  Scissors,
} from "lucide-react"

export function Toolbar() {
  const [fontSize, setFontSize] = useState("11")
  const [fontFamily, setFontFamily] = useState("Arial")

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center gap-1">
        {/* File operations */}
        <div className="flex items-center gap-1 mr-4">
          <Button variant="ghost" size="sm">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Clipboard operations */}
        <div className="flex items-center gap-1 mr-4 border-r border-gray-200 pr-4">
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Paste className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Scissors className="h-4 w-4" />
          </Button>
        </div>

        {/* Font controls */}
        <div className="flex items-center gap-2 mr-4">
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm min-w-[100px]"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
          >
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="24">24</option>
          </select>
        </div>

        {/* Text formatting */}
        <div className="flex items-center gap-1 mr-4 border-r border-gray-200 pr-4">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 mr-4 border-r border-gray-200 pr-4">
          <Button variant="ghost" size="sm">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Colors and borders */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <BorderAll className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
