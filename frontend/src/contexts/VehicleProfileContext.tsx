import { createContext, type ReactNode, useContext, useState } from "react"

export interface ScanRecord {
  date: string
  errorCode: string
  errorSummary: string
  status: "critical" | "warning" | "resolved"
}

export interface VehicleProfile {
  id: string
  manufacturer: string
  model: string
  year: string
  engine: string
  transmission: string
  vin: string
  scans: ScanRecord[]
  savedAt: string
}

interface VehicleProfileContextType {
  profiles: VehicleProfile[]
  addProfile: (
    profile: Omit<VehicleProfile, "id" | "savedAt" | "scans">
  ) => void
  addScanToProfile: (profileId: string, scan: ScanRecord) => void
}

const VehicleProfileContext = createContext<
  VehicleProfileContextType | undefined
>(undefined)

export function VehicleProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<VehicleProfile[]>([
    // Datos de ejemplo
    {
      id: "1",
      manufacturer: "Toyota",
      model: "Camry",
      year: "2023",
      engine: "2.5L 4-Cylinder",
      transmission: "Automatic",
      vin: "1HGBH41JXMN109186",
      savedAt: "2024-09-15",
      scans: [
        {
          date: "2024-11-03",
          errorCode: "P0171",
          errorSummary:
            "Sistema de inyección de combustible con mezcla pobre detectada",
          status: "warning",
        },
        {
          date: "2024-10-20",
          errorCode: "P0300",
          errorSummary: "Fallo múltiple de cilindros detectado",
          status: "critical",
        },
        {
          date: "2024-10-05",
          errorCode: "P0420",
          errorSummary:
            "Eficiencia del convertidor catalítico por debajo del umbral",
          status: "warning",
        },
      ],
    },
    {
      id: "2",
      manufacturer: "Honda",
      model: "Civic",
      year: "2022",
      engine: "2.0L 4-Cylinder",
      transmission: "CVT",
      vin: "2HGFC2F59MH123456",
      savedAt: "2024-08-20",
      scans: [
        {
          date: "2024-10-28",
          errorCode: "P0300",
          errorSummary: "Fallo múltiple de cilindros detectado",
          status: "critical",
        },
        {
          date: "2024-10-10",
          errorCode: "P0171",
          errorSummary: "Sistema demasiado pobre (Banco 1)",
          status: "warning",
        },
      ],
    },
    {
      id: "3",
      manufacturer: "Ford",
      model: "F-150",
      year: "2021",
      engine: "3.5L V6",
      transmission: "Automatic",
      vin: "1FTFW1E85MFA12345",
      savedAt: "2024-07-10",
      scans: [
        {
          date: "2024-10-15",
          errorCode: "P0135",
          errorSummary: "Sensor de oxígeno calentador defectuoso",
          status: "resolved",
        },
      ],
    },
  ])

  const addProfile = (
    profileData: Omit<VehicleProfile, "id" | "savedAt" | "scans">
  ) => {
    const newProfile: VehicleProfile = {
      ...profileData,
      id: Date.now().toString(),
      savedAt: new Date().toISOString().split("T")[0],
      scans: [],
    }
    setProfiles([...profiles, newProfile])
  }

  const addScanToProfile = (profileId: string, scan: ScanRecord) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === profileId
          ? { ...profile, scans: [...profile.scans, scan] }
          : profile
      )
    )
  }

  return (
    <VehicleProfileContext.Provider
      value={{ profiles, addProfile, addScanToProfile }}
    >
      {children}
    </VehicleProfileContext.Provider>
  )
}

export function useVehicleProfiles() {
  const context = useContext(VehicleProfileContext)
  if (context === undefined) {
    throw new Error(
      "useVehicleProfiles must be used within a VehicleProfileProvider"
    )
  }
  return context
}
