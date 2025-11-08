import { toast } from "sonner@2.0.3"
import {
  AlertTriangle,
  Bluetooth,
  Car,
  Code,
  Droplet,
  FileCode,
  Fuel,
  Hash,
  Save,
  Wifi,
} from "lucide-react"
import { useState } from "react"
import { useVehicleProfiles } from "../contexts/VehicleProfileContext"
import { OptionCard } from "./OptionCard"
import { Button } from "./ui/button"

const scanOptions = [
  {
    id: "vehicle-info",
    icon: Car,
    title: "Vehicle Information",
    description: "Make, model, and specifications",
    details: {
      manufacturer: "Toyota",
      model: "Camry",
      year: "2023",
      engine: "2.5L 4-Cylinder",
      transmission: "Automatic",
    },
  },
  {
    id: "status-codes",
    icon: AlertTriangle,
    title: "Status Codes",
    description: "Diagnostic trouble codes",
    details: {
      codes: [
        {
          code: "P0300",
          description: "Random/Multiple Cylinder Misfire Detected",
          status: "Pending",
        },
        {
          code: "P0171",
          description: "System Too Lean (Bank 1)",
          status: "Active",
        },
      ],
    },
  },
  {
    id: "fuel-system-1",
    icon: Fuel,
    title: "Fuel System 1",
    description: "Primary fuel system status",
    details: {
      status: "Closed Loop",
      fuelPressure: "58 PSI",
      fuelTrim: "+2.5%",
      injectorPulse: "3.2ms",
    },
  },
  {
    id: "fuel-system-2",
    icon: Droplet,
    title: "Fuel System 2",
    description: "Secondary fuel system status",
    details: {
      status: "Closed Loop",
      fuelPressure: "56 PSI",
      fuelTrim: "+1.8%",
      injectorPulse: "3.1ms",
    },
  },
  {
    id: "vin",
    icon: Hash,
    title: "VIN",
    description: "Vehicle Identification Number",
    details: {
      vin: "1HGBH41JXMN109186",
      country: "United States",
      manufacturer: "Toyota",
      modelYear: "2023",
    },
  },
  {
    id: "cvn",
    icon: FileCode,
    title: "CVN",
    description: "Calibration Verification Number",
    details: {
      cvn: "8A4F2E1C",
      calibrationId: "CAL-2023-TY-01",
      status: "Verified",
      lastUpdate: "2023-08-15",
    },
  },
  {
    id: "calid",
    icon: Code,
    title: "CALID",
    description: "Calibration Identification",
    details: {
      calId: "TOYOTA-2023-V1.2.4",
      version: "1.2.4",
      releaseDate: "2023-07-01",
      checksumValid: true,
    },
  },
]

export function ScanOptions() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [connectionType, setConnectionType] = useState<
    "bluetooth" | "internet" | null
  >(null)
  const { addProfile } = useVehicleProfiles()

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleConnect = (type: "bluetooth" | "internet") => {
    // Aquí se implementaría la lógica de conexión
    if (connectionType === type) {
      setConnectionType(null)
    } else {
      setConnectionType(type)
    }
  }

  const handleSaveProfile = () => {
    const vehicleInfo = scanOptions.find((opt) => opt.id === "vehicle-info")
    const vinInfo = scanOptions.find((opt) => opt.id === "vin")

    if (vehicleInfo && vinInfo) {
      addProfile({
        manufacturer: vehicleInfo.details.manufacturer,
        model: vehicleInfo.details.model,
        year: vehicleInfo.details.year,
        engine: vehicleInfo.details.engine,
        transmission: vehicleInfo.details.transmission,
        vin: vinInfo.details.vin,
      })
      toast.success("Perfil guardado exitosamente")
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl mb-2">Next Generation Scan</h1>
                <p className="text-gray-400 text-sm">
                  Connect your vehicle for real-time diagnostics
                </p>
              </div>
              <Button
                onClick={handleSaveProfile}
                className="bg-blue-600 hover:bg-blue-700 mr-4"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Perfil
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Vincular</span>
            <div className="flex gap-2">
              <Button
                onClick={() => handleConnect("bluetooth")}
                className={`${
                  connectionType === "bluetooth"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                <Bluetooth className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleConnect("internet")}
                className={`${
                  connectionType === "internet"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                <Wifi className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {scanOptions.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isExpanded={expandedId === option.id}
            onToggle={() => toggleExpanded(option.id)}
          />
        ))}
      </div>
    </div>
  )
}
