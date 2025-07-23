export const API_ENDPOINTS = {
  BASE_URL: 'https://sky-scrapper.p.rapidapi.com',
  FLIGHTS_SEARCH: '/api/v2/flights/searchFlights',
  AIRPORTS_SEARCH: '/api/v1/flights/searchAirport',
  AIRPORT_NEARBY: '/api/v1/flights/getNearByAirports',
  FLIGHT_DETAILS: '/api/v1/flights/getFlightDetails',
  PRICE_CALENDAR: '/api/v1/flights/getPriceCalendar',
  FLIGHTS_COMPLETE: '/api/v1/flights/searchFlightsComplete',
};

export const API_TIMEOUT = 30000;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
  'X-RapidAPI-Key': '5ca7483181mshcd2c3a9d394458dp1a8af4jsn4724837b44ca',
};

export const API_CONFIG = {
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
};

export const FLIGHT_API_PARAMS = {
  MARKET: 'US',
  LOCALE: 'en-US',
  CURRENCY: 'USD',
  COUNTRY_CODE: 'US',
};
