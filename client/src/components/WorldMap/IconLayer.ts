import { IconLayer } from "@deck.gl/layers";
import { Dispatch, SetStateAction } from "react";

export interface SkiResort {
    ID: string;
    Resort: string;
    Country: string;
    Continent: string;
    Price: string;
    Season: string;
    "Highest point": string;
    "Lowest point": string;
    "Beginner slopes": string;
    "Intermediate slopes": string;
    "Difficult slopes": string;
    "Total slopes": string;
    "Longest run": string;
    "Snow cannons": string;
    "Surface lifts": string;
    "Chair lifts": string;
    "Gondola lifts": string;
    "Total lifts": string;
    "Lift capacity": string;
    "Child friendly": string;
    Snowparks: string;
    Nightskiing: string;
    "Summer skiing": string;
    coordinates: [string, string];
}


interface ResortIconLayer {
    setCurrentResort: Dispatch<SetStateAction<SkiResort | undefined>>
}

const ResortIconLayer = ({ setCurrentResort }: ResortIconLayer) => {
    const ICON_MAPPING = {
        marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
    };

    const icon_layer = new IconLayer({
        id: "Resorts",
        data: "https://raw.githubusercontent.com/dev-pigeon/skiing_weather/refs/heads/main/data/resorts.json",
        getColor: () => [255, 140, 0],
        getIcon: () => 'marker',
        getSize: 50,
        getPosition: (d) => d.coordinates.map(parseFloat),
        pickable: true,
        autoHighlight: true,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        onHover: (icon) => {
            if (icon.object) {
                const resort: SkiResort = icon.object;
                console.log(resort);
                setCurrentResort(resort);
            }
        },
    });

    return { icon_layer }
}

export default ResortIconLayer;