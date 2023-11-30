import React, { useEffect } from 'react'
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css'

const Map = () => {
  useEffect(() => {
    // Coordinates for Oulu, Finland
    const ouluLatitude = 65.0121
    const ouluLongitude = 25.4682
    const initialZoom = 13

    const map = L.map('map-container').setView(
      [ouluLatitude, ouluLongitude],
      initialZoom
    )
    // contribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // marker
    const marker = L.icon({
      iconUrl: 'marker.png',
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5]
    })

    // Marker locations
    const locations = [
        {
            name: 'Locker1 : Prisma Linnanmaa',
            latitude: 65.05439,
            longitude: 25.45621,
            icon: marker
          },
          {
            name: 'Locker2 : K-Market Kaijonharju',
            latitude: 65.05909,
            longitude: 25.47727,
            icon: marker
          },
          {
            name: 'Locker3 : Lidl Tuira',
            latitude: 65.02695,
            longitude: 25.46944,
            icon: marker
          },
          {
            name: 'Locker4 : Lidl Pataniemi',
            latitude: 65.08055,
            longitude: 25.40608,
            icon: marker
          },
    
          {
            name: 'Locker5 : Prisma Raksila',
            latitude: 65.01052,
            longitude: 25.49091,
            icon: marker
          }
    ]

    // Add markers for each location
    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: location.icon
      }).addTo(map)
      marker.bindPopup(location.name)
    })

    return () => {
      map.remove()
    }
  }, [])

  return <div id='map-container' style={{ width: '50%', height: '400px' }} />
}

export default Map