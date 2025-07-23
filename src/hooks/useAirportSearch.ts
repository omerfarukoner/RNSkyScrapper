import { useState, useCallback, useRef, useEffect } from 'react';
import * as flightService from '../services/flightService';
import { Airport } from '../types';

interface UseAirportSearchState {
  results: Airport[];
  loading: boolean;
  error: string | null;
}

interface UseAirportSearchReturn extends UseAirportSearchState {
  searchAirports: (query: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}

export const useAirportSearch = (debounceMs: number = 300): UseAirportSearchReturn => {
  const [state, setState] = useState<UseAirportSearchState>({
    results: [],
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchAirports = useCallback(async (query: string): Promise<void> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!query.trim()) {
      setState({
        results: [],
        loading: false,
        error: null,
      });
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const results = await flightService.searchAirports(query, abortControllerRef.current.signal);
        
        if (abortControllerRef.current.signal.aborted) {
          return;
        }

        setState({
          results,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        setState({
          results: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Airport search failed',
        });
      }
    }, debounceMs);
  }, [debounceMs]);

  const clearResults = useCallback(() => {
    setState({
      results: [],
      loading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    results: state.results,
    loading: state.loading,
    error: state.error,
    searchAirports,
    clearResults,
    clearError,
  };
};