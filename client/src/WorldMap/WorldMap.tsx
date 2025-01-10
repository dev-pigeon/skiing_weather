import { useState } from "react";
import { Map, useControl } from "react-map-gl/maplibre";
import  { StyleSpecification } from "maplibre-gl";
import { DeckProps, MapViewState } from "deck.gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { defaultMapPosition } from "./defaultMapPosition";
import {IconLayer} from '@deck.gl/layers';
import BASEMAP from "./customMapStyles.json";
import { Button } from "@mui/material";
import MapLibreGL from "maplibre-gl";
import resorts from "../../../data/resorts.json";


MapLibreGL.setWorkerUrl("maplibre-gl-csp-worker.js"); // maplibre worker URL

function DeckGLOverlay(props: DeckProps) {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
  }

  const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  const icon_layer = new IconLayer({
    id: "Resorts",
    data: resorts,
    getColor: () => [255, 140, 0],
    getIcon: () => 'marker',
    getSize: 40,
    getPosition: (d) => d.coordinates.map(parseFloat),
    pickable: true,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
  });

function WorldMap() {
  const [mapViewState, setMapViewState] = useState({
    longitude: defaultMapPosition.longitude,
    latitude: defaultMapPosition.latitude,
    zoom: defaultMapPosition.zoom,
  } as MapViewState);

  return (
    <Map
    onMove={(event) => {setMapViewState(event.viewState)}}
    onClick={() => {console.log("hi there")}}
    mapLib={MapLibreGL}
    attributionControl={false}
     {...mapViewState}
      style={{ height: "100vh", width: "100vw" }}
      mapboxAccessToken="pk.eyJ1IjoiZGV2LXBpZ2VvbiIsImEiOiJjbTU0bGNkdHkxb3c5Mm1xMm01Y2J3OXI0In0.Kr1Q1I68UZeR6jDR-PcgUQ"
      //@ts-ignore
      mapStyle={BASEMAP.SATELLITE as StyleSpecification}
    >
     <DeckGLOverlay layers={[icon_layer]}/>
     <Button
        variant="contained"
        style={{
          position: "absolute",
          bottom:"10px",
          left: "46vw",
          zIndex: 1,
        }}
      >
        PRESS ME
      </Button>
    </Map>
  );
}

export default WorldMap;
