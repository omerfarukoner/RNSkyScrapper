import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Screen, LocationInput } from '../../components';
import DateRangePicker from '../../components/DateRangePicker';
import { useAuth } from '../../context/AuthContext';
import { useFlightSearch } from '../../hooks';
import * as flightService from '../../services/flightService';
import { FlightSearchParams } from '../../types';
import { colors } from '../../theme';
import { strings } from '../../constants';
import styles from './FlightSearchScreen.styles';

interface FlightSearchScreenProps {
  navigation: any;
}

const FlightSearchScreen: React.FC<FlightSearchScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { data: flightData, loading: isSearching, error: searchError, searchFlights, clearError, abort } = useFlightSearch();
  
  const [origin, setOrigin] = useState('London');
  const [destination, setDestination] = useState('New York');
  const getDefaultDepartureDate = () => {
    const date = new Date();
    date.setFullYear(2025, 7, 23); // August 23, 2025 (month is 0-indexed)
    return date;
  };
  
  const getDefaultReturnDate = () => {
    const date = new Date();
    date.setFullYear(2025, 8, 12); // September 12, 2025 (month is 0-indexed)
    return date;
  };
  
  const [departureDate, setDepartureDate] = useState(getDefaultDepartureDate());
  const [returnDate, setReturnDate] = useState<Date | null>(getDefaultReturnDate());
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'economy' | 'business' | 'first'>('economy');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSelectingReturnDate, setIsSelectingReturnDate] = useState(false);
  
  const [originSkyId, setOriginSkyId] = useState('LOND');
  const [destinationSkyId, setDestinationSkyId] = useState('NYCA');
  const [originEntityId, setOriginEntityId] = useState('27544008');
  const [destinationEntityId, setDestinationEntityId] = useState('27537542');
  const alternativeRoutes = [
    { name: "London → New York", originSkyId: "LOND", destinationSkyId: "NYCA", originEntityId: "27544008", destinationEntityId: "27537542" },
    { name: "London → Paris", originSkyId: "LOND", destinationSkyId: "PARI", originEntityId: "27544008", destinationEntityId: "27539793" },
    { name: "New York → Los Angeles", originSkyId: "NYCA", destinationSkyId: "LAXA", originEntityId: "27537542", destinationEntityId: "27537473" },
    { name: "Istanbul → London", originSkyId: "ISTA", destinationSkyId: "LOND", originEntityId: "95673467", destinationEntityId: "27544008" }
  ];

  const handleSearch = async () => {
    if (!origin || !destination) {
      Alert.alert(strings.common.error, strings.errors.missingOriginDestination);
      return;
    }

    clearError();
    
    const searchParams: FlightSearchParams = {
      originSkyId: originSkyId,
      destinationSkyId: destinationSkyId,
      originEntityId: originEntityId,
      destinationEntityId: destinationEntityId,
      date: flightService.formatDate(departureDate),
      returnDate: isRoundTrip && returnDate ? flightService.formatDate(returnDate) : undefined,
      cabinClass: cabinClass,
      adults: passengers.toString(),
      sortBy: 'best',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US',
    };

    await searchFlights(searchParams);
  };

  useEffect(() => {
    if (flightData) {
      const searchParams: FlightSearchParams = {
        originSkyId: originSkyId,
        destinationSkyId: destinationSkyId,
        originEntityId: originEntityId,
        destinationEntityId: destinationEntityId,
        date: flightService.formatDate(departureDate),
        returnDate: isRoundTrip && returnDate ? flightService.formatDate(returnDate) : undefined,
        cabinClass: cabinClass,
        adults: passengers.toString(),
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      };
      
      navigation.navigate('FlightResults', { searchParams, flightData });
    }
  }, [flightData]);

  useEffect(() => {
    if (searchError) {
      Alert.alert(strings.errors.searchFailed, searchError);
    }
  }, [searchError]);

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  const handleLogout = async () => {
    Alert.alert(
      strings.auth.logout,
      strings.auth.logoutConfirm,
      [
        {
          text: strings.common.cancel,
          style: 'cancel',
        },
        {
          text: strings.common.ok,
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert(strings.common.error, strings.errors.logoutFailed);
            }
          },
        },
      ]
    );
  };

  const handleSwapLocations = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
    
    const tempSkyId = originSkyId;
    setOriginSkyId(destinationSkyId);
    setDestinationSkyId(tempSkyId);
    
    const tempEntityId = originEntityId;
    setOriginEntityId(destinationEntityId);
    setDestinationEntityId(tempEntityId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    });
  };

  const adjustDate = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const getCabinClassText = (className: string) => {
    const classNames = {
      economy: strings.flightSearch.economy,
      business: strings.flightSearch.business,
      first: strings.flightSearch.firstClass
    };
    return classNames[className as keyof typeof classNames] || strings.flightSearch.economy;
  };

  const handleDateSelect = (date: Date, isReturn = false) => {
    if (!isRoundTrip) {
      setDepartureDate(date);
      setReturnDate(null);
    } else if (isSelectingReturnDate || isReturn) {
      setReturnDate(date);
    } else {
      setDepartureDate(date);
      if (returnDate && date >= returnDate) {
        setReturnDate(null);
      }
    }
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
    setIsSelectingReturnDate(false);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>{strings.flightSearch.hello}, {user?.username}!</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>{strings.auth.logout}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{strings.flightSearch.title}</Text>
          <Text style={styles.subtitle}>{strings.flightSearch.subtitle}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.quickRoutesContainer}>
            <Text style={styles.quickRoutesLabel}>Quick Test Routes:</Text>
            <View style={styles.quickRoutesButtons}>
              {alternativeRoutes.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickRouteButton}
                  onPress={() => {
                    const [originName, destName] = route.name.split(' → ');
                    setOrigin(originName);
                    setDestination(destName);
                    setOriginSkyId(route.originSkyId);
                    setDestinationSkyId(route.destinationSkyId);
                    setOriginEntityId(route.originEntityId);
                    setDestinationEntityId(route.destinationEntityId);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.quickRouteText}>{route.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              style={[styles.tripTypeButton, !isRoundTrip && styles.tripTypeButtonActive]}
              onPress={() => {
                setIsRoundTrip(false);
                setReturnDate(null);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.tripTypeText, !isRoundTrip && styles.tripTypeTextActive]}>
                {strings.flightSearch.oneWay}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tripTypeButton, isRoundTrip && styles.tripTypeButtonActive]}
              onPress={() => setIsRoundTrip(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tripTypeText, isRoundTrip && styles.tripTypeTextActive]}>
                {strings.flightSearch.roundTrip}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationCard}>
            <View style={styles.locationContainer}>
              <LocationInput
                value={origin}
                onChangeText={setOrigin}
                placeholder={strings.flightSearch.fromPlaceholder}
              />
              <LocationInput
                value={destination}
                onChangeText={setDestination}
                placeholder={strings.flightSearch.toPlaceholder}
              />
            </View>
            <View style={styles.swapButtonContainer}>
              <TouchableOpacity style={styles.swapButton} onPress={handleSwapLocations} activeOpacity={0.8}>
                <Text style={styles.swapButtonText}>⇅</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dateCard}>
            <View style={styles.dateContainer}>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => {
                  setIsSelectingReturnDate(false);
                  setShowDatePicker(true);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.dateLabel}>{strings.flightSearch.departure}</Text>
                <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
              </TouchableOpacity>

              {isRoundTrip && (
                <>
                  <View style={styles.dateDivider} />
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => {
                      setIsSelectingReturnDate(true);
                      setShowDatePicker(true);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.dateLabel}>{strings.flightSearch.return}</Text>
                    <Text style={styles.dateText}>
                      {returnDate ? formatDate(returnDate) : strings.flightSearch.selectDate}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.optionsCard}>
            <View style={styles.optionsContainer}>
              <View style={styles.passengersContainer}>
                <Text style={styles.optionLabel}>{strings.flightSearch.passengers}</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={[styles.counterButton, passengers === 1 && styles.counterButtonDisabled]}
                    onPress={() => setPassengers(Math.max(1, passengers - 1))}
                    disabled={passengers === 1}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.counterButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{passengers}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setPassengers(passengers + 1)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.classContainer}>
                <Text style={styles.optionLabel}>{strings.flightSearch.class}</Text>
                <TouchableOpacity style={styles.classButton} activeOpacity={0.8}>
                  <Text style={styles.classText}>{getCabinClassText(cabinClass)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.searchButton, isSearching && styles.searchButtonDisabled]}
        onPress={handleSearch}
        disabled={isSearching}
        activeOpacity={0.8}
      >
        <Text style={styles.searchButtonText}>
          {isSearching ? strings.flightSearch.searching : strings.flightSearch.search}
        </Text>
      </TouchableOpacity>

      <DateRangePicker
        visible={showDatePicker}
        onClose={handleDatePickerClose}
        onDateSelect={handleDateSelect}
        selectedDepartureDate={departureDate}
        selectedReturnDate={returnDate}
        isRoundTrip={isRoundTrip}
      />
    </Screen>
  );
};

export default FlightSearchScreen;