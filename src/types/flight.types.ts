export interface Airport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export interface NearbyAirportsResponse {
  status: boolean;
  timestamp: number;
  data: {
    current: Airport;
    nearby: Airport[];
    recent: Airport[];
  };
}

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: Airport[];
}

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  adults: string | number;
  children?: string | number;
  infants?: string | number;
  sortBy?: 'price_high' | 'fastest' | 'best';
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface FlightOffer {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  score?: number;
  segmentsCount?: number;
  totalDuration?: number;
  transfersCount?: number;
  carriers?: Carrier[];
  tags?: string[];
  deeplink?: string;
}

export interface FlightLeg {
  id: string;
  origin: {
    skyId: string;
    name: string;
    city: string;
    country: string;
  };
  destination: {
    skyId: string;
    name: string;
    city: string;
    country: string;
  };
  durationInMinutes: number;
  stopCount: number;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
  departure: string;
  arrival: string;
  segments: FlightSegment[];
}

export interface FlightSegment {
  id: string;
  origin: {
    skyId: string;
    name: string;
    city: string;
    country: string;
  };
  destination: {
    skyId: string;
    name: string;
    city: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
}

export interface Carrier {
  id: string;
  name: string;
  alternativeName?: string;
  allianceId?: string;
  displayCode: string;
}

export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  data: {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: FlightItinerary[];
  };
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  pricingOptionId: string;
  legs: FlightLegV2[];
}

export interface FlightLegV2 {
  id: string;
  origin: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: CarrierInfo[];
    operating?: CarrierInfo[];
  };
  segments: FlightSegmentV2[];
}

export interface CarrierInfo {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
  operationType?: string;
}

export interface FlightSegmentV2 {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
  };
  operatingCarrier: {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
  };
  transportMode: string;
}

export interface FilterStats {
  duration: {
    min: number;
    max: number;
  };
  airports: {
    skyId: string;
    name: string;
    city: string;
    country: string;
  }[];
  carriers: Carrier[];
  stops: {
    direct: number;
    one: number;
    twoOrMore: number;
  };
}

