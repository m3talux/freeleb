// A Feature represents a geographic feature, containing both geometry and properties
interface IFeature {
    type: string;  // Usually "Feature"
    properties: Properties;  // Custom properties for the region
    geometry: Geometry;  // Geometry information (MultiPolygon)
}

// Properties contain region-specific information
interface Properties {
    GID_2: string;  // Unique ID for the region (level 2)
    GID_0: string;  // Unique ID for the country (level 0)
    COUNTRY: string;  // Country name (Lebanon in this case)
    GID_1: string;  // Unique ID for the region (level 1)
    NAME_1: string;  // Name of the region (e.g., "Akkar", "Beirut")
    NAME_2: string;  // Name of the district (sub-region)
    TYPE_2: string;  // Type of administrative region (e.g., "Qadaa")
    ENGTYPE_2: string;  // English type name for the region (e.g., "District")
    CC_2?: string;  // Optional field (can be null)
    HASC_2?: string;  // Optional field (can be null)
    count: number;
    color: string;
}

// Geometry contains the type of geometry (MultiPolygon) and the coordinates
interface Geometry {
    type: string;  // Usually "MultiPolygon"
    coordinates: number[][][][];  // 4-level nested array for MultiPolygon coordinates
}

export default IFeature;