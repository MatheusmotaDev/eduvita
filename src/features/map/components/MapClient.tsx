"use client";

import { useEffect, useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { CityVulnerability, getCityVulnerabilities } from '@/features/rankings/services/ivebService';
import { Loader2, AlertTriangle, Building2, MapPin } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';

export function MapClient() {
  const [data, setData] = useState<CityVulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupInfo, setPopupInfo] = useState<CityVulnerability | null>(null);

  useEffect(() => {
    getCityVulnerabilities().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-200 min-h-[500px]">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-4" />
        <p className="text-neutral-500 font-medium">Processando IVEB e coordenadas espaciais do Brasil...</p>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden relative">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -51.9253,
          latitude: -14.2350,
          zoom: 3.5
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl position="bottom-right" />

        {data.map((city) => {
          // Cores baseadas no IVEB (Vermelho = Crítico, Amarelo = Alerta, Verde = Bom)
          const color = city.ivebScore >= 6 ? '#ef4444' : city.ivebScore >= 3 ? '#f59e0b' : '#10b981';
          const size = Math.max(20, city.ivebScore * 6);

          return (
            <Marker
              key={city.co_municipio}
              longitude={city.lng}
              latitude={city.lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(city);
              }}
            >
              <div 
                className="rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  backgroundColor: color,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: 0.8,
                  border: '2px solid white'
                }}
              >
                {city.ivebScore}
              </div>
            </Marker>
          );
        })}

        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            className="rounded-xl overflow-hidden"
            maxWidth="320px"
          >
            <div className="p-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-neutral-500" />
                <h3 className="font-bold text-base text-neutral-900">{popupInfo.no_municipio} - {popupInfo.sg_uf}</h3>
              </div>
              
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between items-center bg-neutral-50 p-2 rounded">
                  <span className="text-xs text-neutral-500 font-semibold uppercase flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> IVEB Local
                  </span>
                  <Badge variant={popupInfo.ivebScore >= 6 ? 'critical' : popupInfo.ivebScore >= 3 ? 'warning' : 'success'}>
                    Nota {popupInfo.ivebScore}/10
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center bg-neutral-50 p-2 rounded">
                  <span className="text-xs text-neutral-500 font-semibold uppercase flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> Escolas Críticas
                  </span>
                  <span className="font-bold text-neutral-900 text-sm">
                    {popupInfo.criticalSchools} de {popupInfo.totalSchools}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
