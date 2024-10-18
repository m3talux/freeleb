import {Properties} from "@/app/sections/map/interfaces/Properties";
import {Geometry} from "@/app/sections/map/interfaces/Geometry";

export interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
}