import { AlertTriangle, Calendar, Car } from "lucide-react"

interface ScanRecord {
  id: string
  date: string
  manufacturer: string
  model: string
  vin: string
  errorSummary: string
  errorCode: string
  status: "critical" | "warning" | "resolved"
}

const scanHistory: ScanRecord[] = [
  {
    id: "1",
    date: "2024-11-03",
    manufacturer: "Toyota",
    model: "Camry 2023",
    vin: "1HGBH41JXMN109186",
    errorSummary:
      "Sistema de inyección de combustible con mezcla pobre detectada en banco 1",
    errorCode: "P0171",
    status: "warning",
  },
  {
    id: "2",
    date: "2024-10-28",
    manufacturer: "Honda",
    model: "Civic 2022",
    vin: "2HGFC2F59MH123456",
    errorSummary:
      "Fallo múltiple de cilindros detectado. Revisar bujías y bobinas de encendido",
    errorCode: "P0300",
    status: "critical",
  },
  {
    id: "3",
    date: "2024-10-15",
    manufacturer: "Ford",
    model: "F-150 2021",
    vin: "1FTFW1E85MFA12345",
    errorSummary: "Sensor de oxígeno calentador defectuoso (Banco 1, Sensor 1)",
    errorCode: "P0135",
    status: "resolved",
  },
  {
    id: "4",
    date: "2024-10-08",
    manufacturer: "Chevrolet",
    model: "Silverado 2020",
    vin: "3GCUKREC5LG123456",
    errorSummary:
      "Sistema de control de emisiones evaporativas - fuga detectada",
    errorCode: "P0442",
    status: "warning",
  },
  {
    id: "5",
    date: "2024-09-22",
    manufacturer: "Nissan",
    model: "Altima 2023",
    vin: "1N4BL4BV8NC123456",
    errorSummary:
      "Sensor de posición del árbol de levas A (Banco 1) - circuito con rango/rendimiento",
    errorCode: "P0011",
    status: "resolved",
  },
  {
    id: "6",
    date: "2024-09-10",
    manufacturer: "Mazda",
    model: "CX-5 2022",
    vin: "JM3KFBDM5N0123456",
    errorSummary:
      "Presión de combustible baja - verificar bomba de combustible y filtro",
    errorCode: "P0087",
    status: "critical",
  },
]

export function ScanHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Crítico"
      case "warning":
        return "Advertencia"
      case "resolved":
        return "Resuelto"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Historial de Escaneos</h1>
        <p className="text-gray-400 text-sm">
          Análisis anteriores de vehículos
        </p>
      </div>

      <div className="space-y-4">
        {scanHistory.map((record) => (
          <div
            key={record.id}
            className="bg-[#0d1b2e] rounded-lg border border-gray-800 p-4 hover:border-orange-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">
                    {record.manufacturer} {record.model}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{record.date}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded border ${getStatusColor(record.status)}`}
              >
                {getStatusText(record.status)}
              </span>
            </div>

            <div className="bg-[#0a1628] p-3 rounded-lg mb-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300 mb-1">
                    {record.errorSummary}
                  </p>
                  <span className="text-xs text-orange-500">
                    Código: {record.errorCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="bg-[#0a1628] p-2 rounded">
                <p className="text-xs text-gray-500">VIN</p>
                <p className="text-sm text-white">{record.vin}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
