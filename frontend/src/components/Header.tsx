import { Car, HelpCircle, Settings } from "lucide-react"

export function Header() {
  return (
    <header className="bg-[#0d1b2e] px-4 py-4 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="bg-orange-500 p-1.5 rounded">
          <Car className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg">OBD AutoScan</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
