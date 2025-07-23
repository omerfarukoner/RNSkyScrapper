import { FlightSearchParams, FlightOffer } from './flight.types';

export type AuthStackParamList = {
  Login: {
    username?: string;
    password?: string;
    showSuccessMessage?: boolean;
  } | undefined;
  Register: undefined;
};

export type MainStackParamList = {
  FlightSearch: undefined;
  FlightResults: { searchParams: FlightSearchParams };
  FlightDetails: { flight: FlightOffer };
};

export type RootStackParamList = {
};
