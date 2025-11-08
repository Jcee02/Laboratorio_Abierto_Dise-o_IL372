import {
  ChevronRight,
  Globe,
  Mail,
  Palette,
  Phone,
  RefreshCw,
  Shield,
  Usb,
  User,
} from "lucide-react"
import { Separator } from "./ui/separator"

export function Profile() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Perfil</h1>
        <p className="text-gray-400 text-sm">
          Información y configuración de la cuenta
        </p>
      </div>

      {/* Información del Usuario */}
      <div className="bg-[#0d1b2e] rounded-lg border border-gray-800 p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-500 p-4 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl text-white">Juan Pérez</h2>
            <p className="text-sm text-gray-400">Usuario Premium</p>
          </div>
        </div>

        <Separator className="mb-4 bg-gray-800" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Mail className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Correo electrónico</p>
              <p className="text-white text-sm">juan.perez@email.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Phone className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Número de teléfono</p>
              <p className="text-white text-sm">+52 123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="bg-[#0d1b2e] rounded-lg border border-gray-800 overflow-hidden mb-4">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-white">Preferencias</h3>
        </div>

        <button className="w-full p-4 flex items-center justify-between hover:bg-[#152336] transition-colors border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Globe className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Idioma</p>
              <p className="text-xs text-gray-400">Español</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-[#152336] transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Palette className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Apariencia</p>
              <p className="text-xs text-gray-400">Dark</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Configuración */}
      <div className="bg-[#0d1b2e] rounded-lg border border-gray-800 overflow-hidden mb-4">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-white">Configuración</h3>
        </div>

        <button className="w-full p-4 flex items-center justify-between hover:bg-[#152336] transition-colors border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Usb className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm">
                Puerto de conexión del dispositivo
              </p>
              <p className="text-xs text-gray-400">COM 28</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-[#152336] transition-colors border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <RefreshCw className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Buscar actualización</p>
              <p className="text-xs text-gray-400">Versión 2.5.1</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-[#152336] transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-[#0a1628] p-2 rounded-lg">
              <Shield className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm">Aviso de privacidad</p>
              <p className="text-xs text-gray-400">Términos y condiciones</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Botón de cerrar sesión */}
      <button className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors">
        Cerrar sesión
      </button>
    </div>
  )
}
