import { useState, useCallback, useRef } from 'react';
import * as flightService from '../services/flightService';
import { FlightSearchParams, FlightSearchResponse } from '../types';

interface UseFlightSearchState {
  data: FlightSearchResponse | null;
  loading: boolean;
  error: string | null;
}

interface UseFlightSearchReturn extends UseFlightSearchState {
  searchFlights: (params: FlightSearchParams) => Promise<void>;
  clearError: () => void;
  abort: () => void;
}

export const useFlightSearch = (): UseFlightSearchReturn => {
  const [state, setState] = useState<UseFlightSearchState>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const searchFlights = useCallback(async (params: FlightSearchParams): Promise<void> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await flightService.searchFlights(params, abortControllerRef.current.signal);
      
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setState({
        data: result,
        loading: false,
        error: null,
      });
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Flight search failed',
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setState(prev => ({
        ...prev,
        loading: false,
      }));
    }
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    searchFlights,
    clearError,
    abort,
  };
};