import { useState } from "react"
import { Analytics } from "./components/Analytics"
import { BottomNav } from "./components/BottomNav"
import { Header } from "./components/Header"
import { Profile } from "./components/Profile"
import { ScanHistory } from "./components/ScanHistory"
import { ScanOptions } from "./components/ScanOptions"
import { Toaster } from "./components/ui/sonner"
import { VehicleProfileProvider } from "./contexts/VehicleProfileContext"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <VehicleProfileProvider>
      <div className="min-h-screen bg-[#0a1628] text-white flex flex-col">
        <Header />

        <main className="flex-1 pb-20">
          {activeTab === "home" && <ScanOptions />}
          {activeTab === "history" && <ScanHistory />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "profile" && <Profile />}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <Toaster />
      </div>
    </VehicleProfileProvider>
  )
}
