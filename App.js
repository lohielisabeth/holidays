import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import CountrySelector from './components/CountrySelector';  

export default function App() {
  const [holidays, setHolidays] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('FI'); 
  const [countryList, setCountryList] = useState([
    { key: 'FI', label: 'Finland', value: 'FI' },
    { key: 'SE', label: 'Sweden', value: 'SE' },
    { key: 'NO', label: 'Norway', value: 'NO' },
    { key: 'DK', label: 'Denmark', value: 'DK' },
    { key: 'IS', label: 'Iceland', value: 'IS' },
    { key: 'EE', label: 'Estonia', value: 'EE' },
  ]);
  
  const controllerRef = useRef();

  useEffect(() => {
    const URL = `https://date.nager.at/api/v3/PublicHolidays/2025/${selectedCountry}`;

    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setHolidays(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCountry]);  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public Holidays in {countryList.find(c => c.value === selectedCountry)?.label} (2025)</Text>
      <CountrySelector 
        values={countryList} 
        selected={selectedCountry} 
        onValueChange={setSelectedCountry} 
      />
      <ScrollView style={styles.scrollContainer}>
        {holidays.map((holiday, index) => (
          <View key={index} style={styles.holidayItem}>
            <Text style={styles.date}>{holiday.date}</Text>
            <Text style={styles.localName}>{holiday.localName}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddc8fa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: '#5a358c',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
  scrollContainer: {
    width: '100%',
    
  },
  holidayItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d6bbfa',
    borderRadius: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a358c',
  },
  localName: {
    fontSize: 15,
    color: '#555',
    color: '#5a358c',
  },
});
