import {
  AlertTriangle,
  Calendar,
  Car,
  ChevronRight,
  TrendingUp,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  useVehicleProfiles,
  type VehicleProfile,
} from "../contexts/VehicleProfileContext"

const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

export function Analytics() {
  const { profiles } = useVehicleProfiles()
  const [expandedProfileId, setExpandedProfileId] = useState<string | null>(
    null
  )

  const toggleExpanded = (id: string) => {
    setExpandedProfileId(expandedProfileId === id ? null : id)
  }

  const getErrorTypeData = (profile: VehicleProfile) => {
    const errorTypes: Record<string, number> = {}
    profile.scans.forEach((scan) => {
      const type =
        scan.status === "critical"
          ? "Crítico"
          : scan.status === "warning"
            ? "Advertencia"
            : "Resuelto"
      errorTypes[type] = (errorTypes[type] || 0) + 1
    })

    return Object.entries(errorTypes).map(([name, value]) => ({ name, value }))
  }

  const getTimelineData = (profile: VehicleProfile) => {
    return profile.scans.map((scan) => ({
      date: scan.date,
      errors: 1,
      errorCode: scan.errorCode,
    }))
  }

  const getScanFrequency = (profile: VehicleProfile) => {
    const monthlyScans: Record<string, number> = {}

    profile.scans.forEach((scan) => {
      const month = scan.date.substring(0, 7) // YYYY-MM
      monthlyScans[month] = (monthlyScans[month] || 0) + 1
    })

    return Object.entries(monthlyScans).map(([month, count]) => ({
      month,
      scans: count,
    }))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Analytics</h1>
        <p className="text-gray-400 text-sm">
          Perfiles de vehículos guardados y estadísticas
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="bg-[#0d1b2e] rounded-lg border border-gray-800 p-8 text-center">
          <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No hay perfiles guardados aún</p>
          <p className="text-sm text-gray-500 mt-2">
            Guarda un perfil desde el apartado Home
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-[#0d1b2e] rounded-lg border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(profile.id)}
                className="w-full p-4 flex items-center gap-4 hover:bg-[#152336] transition-colors"
              >
                <div className="bg-orange-500 p-3 rounded-lg flex-shrink-0">
                  <Car className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-white mb-0.5">
                    {profile.manufacturer} {profile.model} {profile.year}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {profile.scans.length} escaneos registrados
                  </p>
                </div>

                <motion.div
                  animate={{
                    rotate: expandedProfileId === profile.id ? 90 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedProfileId === profile.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-gray-800">
                      {/* Información del vehículo */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-[#0a1628] p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Motor</p>
                          <p className="text-white text-sm">{profile.engine}</p>
                        </div>
                        <div className="bg-[#0a1628] p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">
                            Transmisión
                          </p>
                          <p className="text-white text-sm">
                            {profile.transmission}
                          </p>
                        </div>
                        <div className="bg-[#0a1628] p-3 rounded-lg col-span-2">
                          <p className="text-xs text-gray-500 mb-1">VIN</p>
                          <p className="text-white text-sm">{profile.vin}</p>
                        </div>
                      </div>

                      {/* Estadísticas */}
                      {profile.scans.length > 0 && (
                        <>
                          {/* Gráfico de tipos de errores */}
                          <div className="bg-[#0a1628] p-4 rounded-lg mb-4">
                            <h4 className="text-white mb-4 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-orange-500" />
                              Distribución de Errores
                            </h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <PieChart>
                                <Pie
                                  data={getErrorTypeData(profile)}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                  }
                                  outerRadius={60}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {getErrorTypeData(profile).map(
                                    (entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                      />
                                    )
                                  )}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Gráfico de frecuencia de escaneos */}
                          <div className="bg-[#0a1628] p-4 rounded-lg mb-4">
                            <h4 className="text-white mb-4 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              Frecuencia de Escaneos
                            </h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={getScanFrequency(profile)}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#1e3a5f"
                                />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "#0d1b2e",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                  }}
                                />
                                <Bar
                                  dataKey="scans"
                                  fill="#f97316"
                                  radius={[8, 8, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Historial de errores */}
                          <div className="bg-[#0a1628] p-4 rounded-lg">
                            <h4 className="text-white mb-4 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                              Historial de Errores
                            </h4>
                            <div className="space-y-3">
                              {profile.scans.map((scan, index) => (
                                <div
                                  key={index}
                                  className="bg-[#0d1b2e] p-3 rounded-lg"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-orange-500 text-sm">
                                      {scan.errorCode}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-3 h-3 text-gray-500" />
                                      <span className="text-xs text-gray-500">
                                        {scan.date}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-300 mb-2">
                                    {scan.errorSummary}
                                  </p>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${
                                      scan.status === "critical"
                                        ? "bg-red-500/20 text-red-400"
                                        : scan.status === "warning"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-green-500/20 text-green-400"
                                    }`}
                                  >
                                    {scan.status === "critical"
                                      ? "Crítico"
                                      : scan.status === "warning"
                                        ? "Advertencia"
                                        : "Resuelto"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
