import { ChevronRight, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface OptionCardProps {
  option: {
    id: string
    icon: LucideIcon
    title: string
    description: string
    details: any
  }
  isExpanded: boolean
  onToggle: () => void
}

export function OptionCard({ option, isExpanded, onToggle }: OptionCardProps) {
  const Icon = option.icon

  return (
    <div className="bg-[#0d1b2e] rounded-lg overflow-hidden border border-gray-800">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 hover:bg-[#152336] transition-colors"
      >
        <div className="bg-orange-500 p-3 rounded-lg flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 text-left">
          <h3 className="text-white mb-0.5">{option.title}</h3>
          <p className="text-gray-400 text-sm">{option.description}</p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-gray-800">
              {renderDetails(option.id, option.details)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function renderDetails(id: string, details: any) {
  if (id === "status-codes") {
    return (
      <div className="space-y-3">
        {details.codes.map((code: any, index: number) => (
          <div key={index} className="bg-[#0a1628] p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-orange-500">{code.code}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  code.status === "Active"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {code.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">{code.description}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="bg-[#0a1628] p-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </p>
          <p className="text-white text-sm">
            {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
          </p>
        </div>
      ))}
    </div>
  )
}
