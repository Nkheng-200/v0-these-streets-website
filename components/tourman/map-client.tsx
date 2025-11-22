"use client"

import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"

// Remove the direct CSS import that was causing MIME type errors
// import "leaflet/dist/leaflet.css"

// Define custom icon to avoid default icon issues without global patching
const customIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export interface Restaurant {
  id: number
  name: string
  lat: number
  lng: number
  cuisine?: string
  address?: string
  phone?: string
  openingHours?: string
  seatingStyle?: string
  maxGroupSize?: number
  busyHours?: string
  signatureDish?: {
    name: string
    price: string
    description: string
  }
  menuShowcase?: {
    name: string
    price: string
    description: string
  }[]
}

interface Tourman {
  id: number
  name: string
  lat: number
  lng: number
  rating: number
  availability: string
  image: string
  hourlyRate: number
}

interface MapClientProps {
  tourmans: Tourman[]
  restaurants?: Restaurant[]
  selectedId?: number
  onSelect: (tourman: Tourman) => void
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, 16, {
      animate: true,
      duration: 2.5, // Slower, more cinematic duration
      easeLinearity: 0.25, // Smoother curve
    })
  }, [center[0], center[1], map]) // Depend on primitives to avoid reference issues
  return null
}

export default function MapClient({ tourmans, restaurants, selectedId, onSelect }: MapClientProps) {
  const defaultCenter: [number, number] = [21.0285, 105.8542]
  const activeTourman = tourmans.find((t) => t.id === selectedId)

  // Memoize center to prevent unnecessary re-renders/flyTo calls
  const center = useMemo(() => {
    return activeTourman ? [activeTourman.lat, activeTourman.lng] : defaultCenter
  }, [activeTourman])

  return (
    <>
      {/* Load Leaflet CSS from CDN instead of import */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={center as [number, number]} />

        {restaurants?.map((restaurant) => (
          <Marker
            key={`rest-${restaurant.id}`}
            position={[restaurant.lat, restaurant.lng]}
            icon={L.divIcon({
              html: `
                <div class="relative flex items-center justify-center group">
                  <div class="w-4 h-4 rounded-full border border-white/50 shadow-md transition-transform duration-300 hover:scale-150" 
                       style="background: radial-gradient(circle at 30% 30%, #ff5252, #b71c1c); box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  </div>
                </div>
              `,
              className: "custom-restaurant-icon",
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })}
          >
            <Popup offset={[0, -4]} minWidth={280} maxWidth={300}>
              <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {/* Header */}
                <div className="border-b border-gray-200 pb-2 mb-2 sticky top-0 bg-white z-10">
                  <h4 className="font-bold text-lg text-[#b71c1c]">{restaurant.name}</h4>
                  <p className="text-xs text-muted-foreground">{restaurant.address}</p>
                </div>

                {/* Info Sections */}
                <div className="space-y-3 text-sm">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-semibold block text-gray-500">Contact</span>
                      {restaurant.phone || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold block text-gray-500">Hours</span>
                      {restaurant.openingHours || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold block text-gray-500">Seating</span>
                      {restaurant.seatingStyle || "Standard"}
                    </div>
                    <div>
                      <span className="font-semibold block text-gray-500">Max Group</span>
                      {restaurant.maxGroupSize || "N/A"}
                    </div>
                  </div>

                  {/* Busy Hours */}
                  {restaurant.busyHours && (
                    <div className="bg-orange-50 p-2 rounded border border-orange-100">
                      <span className="font-semibold text-orange-800 text-xs block mb-1">
                        Busy Hours (Respect Mode)
                      </span>
                      <span className="text-xs text-orange-700">{restaurant.busyHours}</span>
                    </div>
                  )}

                  {/* Signature Dish */}
                  {restaurant.signatureDish && (
                    <div>
                      <h5 className="font-bold text-[#b71c1c] mb-1 flex justify-between items-center">
                        Signature Dish
                        <span className="text-xs bg-[#b71c1c] text-white px-1.5 py-0.5 rounded-full">Must Try</span>
                      </h5>
                      <div className="bg-gray-50 p-2 rounded border border-gray-100">
                        <div className="flex justify-between font-semibold">
                          <span>{restaurant.signatureDish.name}</span>
                          <span className="text-[#b71c1c]">{restaurant.signatureDish.price}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 italic leading-tight">
                          {restaurant.signatureDish.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Menu Showcase */}
                  {restaurant.menuShowcase && restaurant.menuShowcase.length > 0 && (
                    <div>
                      <h5 className="font-bold text-gray-700 mb-1">Menu Showcase</h5>
                      <div className="space-y-2">
                        {restaurant.menuShowcase.map((item, idx) => (
                          <div key={idx} className="border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                            <div className="flex justify-between text-xs font-medium">
                              <span>{item.name}</span>
                              <span className="text-gray-500">{item.price}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-tight">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {tourmans.map((tourman) => (
          <Marker
            key={tourman.id}
            position={[tourman.lat, tourman.lng]}
            icon={L.divIcon({
              html: `
                <div class="flex flex-col items-center cursor-pointer" style="transform: translateX(-50%); margin-left: 0;">
                  <div class="flex flex-col items-center">
                    <img src="${tourman.image || "/placeholder.svg"}" alt="${tourman.name}" class="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover" />
                    <div class="bg-white rounded-lg shadow-md px-2 py-1 mt-1 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-0.5 text-xs font-bold text-primary">
                        <span class="text-yellow-500">★</span>
                        <span>${tourman.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              `,
              iconSize: [60, 80],
              iconAnchor: [30, 80],
              popupAnchor: [0, -80],
              className: "custom-div-icon",
            })}
            eventHandlers={{
              click: () => onSelect(tourman),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm">{tourman.name}</h3>
                <p className="text-xs mt-1">
                  Rating: {tourman.rating} ★<br />
                  Rate: ${tourman.hourlyRate}/hour
                  <br />
                  Status: {tourman.availability}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}
