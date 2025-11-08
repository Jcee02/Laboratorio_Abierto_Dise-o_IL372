import { BarChart3, History, Home, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "history", icon: History, label: "History" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0d1b2e] border-t border-gray-800">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 min-w-[60px] transition-colors"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-orange-500" : "text-gray-400"}`}
              />
              <span
                className={`text-xs ${isActive ? "text-orange-500" : "text-gray-400"}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
