"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import type { Restaurant } from "./map-client"

const MapClient = dynamic(() => import("./map-client"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading Map...</p>
    </div>
  ),
})

interface Tourman {
  id: number
  name: string
  lat: number
  lng: number
  rating: number
  availability: string
}

interface TourmanMapProps {
  tourmans: Tourman[]
  restaurants?: Restaurant[]
  selectedId?: number
  onSelect: (tourman: Tourman) => void
}

export function TourmanMap(props: TourmanMapProps) {
  const MemoizedMap = useMemo(() => <MapClient {...props} />, [props])
  return <div className="w-full h-full">{MemoizedMap}</div>
}
