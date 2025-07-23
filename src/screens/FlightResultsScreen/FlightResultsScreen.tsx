import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Screen } from '../../components';
import { FlightSearchParams, FlightOffer } from '../../types';
import { strings } from '../../constants';
import styles from './FlightResultsScreen.styles';

interface FlightResultsScreenProps {
  navigation: any;
  route: {
    params: {
      searchParams: FlightSearchParams;
      flightData?: any;
    };
  };
}

const mockFlights: FlightOffer[] = [
  {
    id: '1',
    price: { raw: 4250, formatted: '₺4,250' },
    totalDuration: 270,
    transfersCount: 0,
    score: 95,
    segmentsCount: 1,
    deeplink: 'https://example.com',
    tags: ['En İyi Değer'],
    legs: [
      {
        id: 'leg1',
        origin: { skyId: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
        destination: { skyId: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom' },
        durationInMinutes: 270,
        stopCount: 0,
        departure: '2024-02-15T10:30:00',
        arrival: '2024-02-15T13:00:00',
        marketingCarrier: { id: 'TK', name: 'Turkish Airlines', displayCode: 'TK' },
        operatingCarrier: { id: 'TK', name: 'Turkish Airlines', displayCode: 'TK' },
        segments: [],
      },
    ],
    carriers: [{ id: 'TK', name: 'Turkish Airlines', displayCode: 'TK' }],
  },
  {
    id: '2',
    price: { raw: 3890, formatted: '₺3,890' },
    totalDuration: 390,
    transfersCount: 1,
    score: 85,
    segmentsCount: 2,
    deeplink: 'https://example.com',
    tags: ['En Ucuz'],
    legs: [
      {
        id: 'leg2',
        origin: { skyId: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
        destination: { skyId: 'LHR', name: 'Heathrow', city: 'London', country: 'United Kingdom' },
        durationInMinutes: 390,
        stopCount: 1,
        departure: '2024-02-15T08:15:00',
        arrival: '2024-02-15T16:45:00',
        marketingCarrier: { id: 'PC', name: 'Pegasus Airlines', displayCode: 'PC' },
        operatingCarrier: { id: 'PC', name: 'Pegasus Airlines', displayCode: 'PC' },
        segments: [],
      },
    ],
    carriers: [{ id: 'PC', name: 'Pegasus Airlines', displayCode: 'PC' }],
  },
  {
    id: '3',
    price: { raw: 5150, formatted: '₺5,150' },
    totalDuration: 285,
    transfersCount: 0,
    score: 92,
    segmentsCount: 1,
    deeplink: 'https://example.com',
    tags: ['Hızlı'],
    legs: [
      {
        id: 'leg3',
        origin: { skyId: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
        destination: { skyId: 'LGW', name: 'Gatwick', city: 'London', country: 'United Kingdom' },
        durationInMinutes: 285,
        stopCount: 0,
        departure: '2024-02-15T14:20:00',
        arrival: '2024-02-15T16:45:00',
        marketingCarrier: { id: 'BA', name: 'British Airways', displayCode: 'BA' },
        operatingCarrier: { id: 'BA', name: 'British Airways', displayCode: 'BA' },
        segments: [],
      },
    ],
    carriers: [{ id: 'BA', name: 'British Airways', displayCode: 'BA' }],
  },
];

type FilterType = 'best' | 'cheapest' | 'fastest';

const FlightResultsScreen: React.FC<FlightResultsScreenProps> = ({ navigation, route }) => {
  const { flightData } = route.params;
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('best');

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    applyFilter(activeFilter);
  }, [flights, activeFilter]);

  const sortFlights = (flightsToSort: FlightOffer[], filterType: FilterType): FlightOffer[] => {
    const sortedFlights = [...flightsToSort];
    
    switch (filterType) {
      case 'cheapest':
        return sortedFlights.sort((a, b) => a.price.raw - b.price.raw);
      case 'fastest':
        return sortedFlights.sort((a, b) => (a.legs[0]?.durationInMinutes || 0) - (b.legs[0]?.durationInMinutes || 0));
      case 'best':
      default:
        return sortedFlights.sort((a, b) => (b.score || 0) - (a.score || 0));
    }
  };

  const applyFilter = (filterType: FilterType) => {
    const sorted = sortFlights(flights, filterType);
    setFilteredFlights(sorted);
  };

  const handleFilterPress = (filterType: FilterType) => {
    setActiveFilter(filterType);
  };

  const loadFlights = async () => {
    setIsLoading(true);
    try {
      
      if (flightData && flightData.data && flightData.data.itineraries) {
        if (flightData.data.itineraries.length === 0) {
          setFlights([]);
          setIsLoading(false);
          return;
        }
        
        const apiFlights = flightData.data.itineraries.map((itinerary: any) => {
          const firstLegCarrier = itinerary.legs?.[0]?.carriers?.marketing?.[0];
          
          if (!itinerary.legs || itinerary.legs.length === 0) {
            return null;
          }
          
          const firstLeg = itinerary.legs[0];
          if (!firstLeg.carriers || !firstLeg.carriers.marketing || firstLeg.carriers.marketing.length === 0) {
          }
          
          return {
            id: itinerary.id,
            price: {
              raw: itinerary.price.raw,
              formatted: itinerary.price.formatted
            },
            totalDuration: itinerary.legs?.[0]?.durationInMinutes || 0,
            transfersCount: itinerary.legs?.[0]?.stopCount || 0,
            score: itinerary.score || 0,
            segmentsCount: itinerary.legs?.[0]?.segments?.length || 1,
            deeplink: '',
            tags: [],
            legs: itinerary.legs?.map((leg: any) => ({
              id: leg.id,
              origin: {
                skyId: leg.origin.id,
                name: leg.origin.name,
                city: leg.origin.city,
                country: leg.origin.country
              },
              destination: {
                skyId: leg.destination.id,
                name: leg.destination.name,
                city: leg.destination.city,
                country: leg.destination.country
              },
              durationInMinutes: leg.durationInMinutes,
              stopCount: leg.stopCount,
              departure: leg.departure,
              arrival: leg.arrival,
              marketingCarrier: {
                id: leg.carriers?.marketing?.[0]?.alternateId || 'XX',
                name: leg.carriers?.marketing?.[0]?.name || 'Unknown Airline',
                displayCode: leg.carriers?.marketing?.[0]?.displayCode || leg.carriers?.marketing?.[0]?.alternateId || 'XX'
              },
              operatingCarrier: {
                id: leg.carriers?.marketing?.[0]?.alternateId || 'XX',
                name: leg.carriers?.marketing?.[0]?.name || 'Unknown Airline',
                displayCode: leg.carriers?.marketing?.[0]?.displayCode || leg.carriers?.marketing?.[0]?.alternateId || 'XX'
              },
              segments: leg.segments?.map((segment: any) => ({
                id: segment.id,
                origin: {
                  skyId: segment.origin.flightPlaceId,
                  name: segment.origin.name,
                  city: segment.origin.parent.name,
                  country: segment.origin.country
                },
                destination: {
                  skyId: segment.destination.flightPlaceId,
                  name: segment.destination.name,
                  city: segment.destination.parent.name,
                  country: segment.destination.country
                },
                departure: segment.departure,
                arrival: segment.arrival,
                durationInMinutes: segment.durationInMinutes,
                flightNumber: segment.flightNumber,
                marketingCarrier: {
                  id: segment.marketingCarrier.alternateId,
                  name: segment.marketingCarrier.name,
                  displayCode: segment.marketingCarrier.displayCode
                },
                operatingCarrier: {
                  id: segment.operatingCarrier.alternateId,
                  name: segment.operatingCarrier.name,
                  displayCode: segment.operatingCarrier.displayCode
                }
              })) || []
            })) || [],
            carriers: [{
              id: firstLegCarrier?.alternateId || 'XX',
              name: firstLegCarrier?.name || 'Unknown Airline',
              displayCode: firstLegCarrier?.alternateId || 'XX'
            }]
          };
        }).filter(Boolean);
        
        
        setFlights(apiFlights);
      } else {
        setFlights(mockFlights);
      }
      
      setIsLoading(false);
    } catch (error) {
      Alert.alert(strings.common.error, strings.flightResults.loadFailed);
      setFlights(mockFlights);
      setIsLoading(false);
    }
  };

  const handleFlightPress = (flight: FlightOffer) => {
    navigation.navigate('FlightDetails', { flight });
  };

  const parseDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString(),
    };
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderFlightItem = ({ item }: { item: FlightOffer }) => {
    const leg = item.legs?.[0];
    if (!leg) return null;
    
    const departure = parseDateTime(leg.departure);
    const arrival = parseDateTime(leg.arrival);
    
    const carrier = item.carriers?.[0] || { displayCode: 'XX', name: 'Unknown Airline' };

    const getStopColor = (stopCount: number) => {
      if (stopCount === 0) return styles.stopsText;
      if (stopCount === 1) return styles.oneStopText;
      return styles.multiStopText;
    };

    const getStopText = (stopCount: number) => {
      if (stopCount === 0) return strings.flightResults.direct;
      if (stopCount === 1) return strings.flightResults.oneStop;
      return `${stopCount} ${strings.flightResults.multipleStops}`;
    };

    return (
      <TouchableOpacity 
        style={styles.flightCard} 
        onPress={() => handleFlightPress(item)}
        activeOpacity={0.95}
      >
        <View style={styles.flightHeader}>
          <View style={styles.airlineInfo}>
            <View style={styles.airlineContainer}>
              <View style={styles.airlineLogo}>
                <Text style={styles.airlineLogoText}>{carrier.displayCode || 'XX'}</Text>
              </View>
              <Text style={styles.airlineName}>{carrier.name || 'Unknown Airline'}</Text>
            </View>
            <Text style={styles.flightNumber}>
              {leg.segments?.[0]?.flightNumber ? 
                `${carrier.displayCode} ${leg.segments[0].flightNumber}` :
                `${carrier.displayCode} Flight`
              }
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price.formatted}</Text>
            <Text style={styles.priceLabel}>{strings.flightResults.perPerson}</Text>
            {item.tags && item.tags.length > 0 && (
              <View style={styles.tagContainer}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.flightRoute}>
          <View style={styles.routePoint}>
            <Text style={styles.time}>{departure.time}</Text>
            <Text style={styles.airport}>{leg.origin.skyId || 'XXX'}</Text>
            <Text style={styles.city}>{leg.origin.city}</Text>
          </View>

          <View style={styles.flightLine}>
            <View style={styles.flightPath}>
              <View style={styles.line} />
              <View style={styles.line} />
            </View>
            <View style={styles.planeIcon}>
              <Text style={styles.planeIconText}>✈</Text>
            </View>
            <View style={styles.durationContainer}>
              <Text style={styles.duration}>{formatDuration(leg.durationInMinutes)}</Text>
            </View>
            <View style={styles.stopsContainer}>
              <View 
                style={[
                  styles.stopsIndicator,
                  leg.stopCount === 0 ? styles.directFlight : 
                  leg.stopCount === 1 ? styles.oneStop : styles.multiStop
                ]} 
              />
              <Text style={[styles.stops, getStopColor(leg.stopCount)]}>
                {getStopText(leg.stopCount)}
              </Text>
            </View>
          </View>

          <View style={styles.routePoint}>
            <Text style={styles.time}>{arrival.time}</Text>
            <Text style={styles.airport}>{leg.destination.skyId || 'XXX'}</Text>
            <Text style={styles.city}>{leg.destination.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingSpinner}>✈️</Text>
          <Text style={styles.loadingText}>{strings.flightResults.searchingFlights}</Text>
        </View>
      </Screen>
    );
  }

  if (filteredFlights.length === 0 && !isLoading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.resultsCount}>0 {strings.flightResults.flightsFound}</Text>
          <Text style={styles.route}>
            {strings.flightResults.route} • {strings.flightResults.date}
          </Text>
        </View>
        
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsIcon}>✈️</Text>
          <Text style={styles.noResultsTitle}>{strings.flightResults.noResults.title}</Text>
          <Text style={styles.noResultsMessage}>
            {strings.flightResults.noResults.message}
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>{strings.flightResults.noResults.newSearchButton}</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsCount}>{filteredFlights.length} {strings.flightResults.flightsFound}</Text>
        <Text style={styles.route}>
          {strings.flightResults.route} • {strings.flightResults.date}
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'best' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('best')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'best' && styles.filterButtonTextActive]}>
            {strings.flightResults.filters.best}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'cheapest' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('cheapest')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'cheapest' && styles.filterButtonTextActive]}>
            {strings.flightResults.filters.cheapest}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'fastest' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('fastest')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'fastest' && styles.filterButtonTextActive]}>
            {strings.flightResults.filters.fastest}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredFlights}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default FlightResultsScreen;