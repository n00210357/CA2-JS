import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FestivalItem from '@/components/FestivalItem';

import { FestivalType } from '@/types';

import { Link } from 'expo-router';

export default function Tab() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    
    axios.get('https://festivals-api.vercel.app/api/festivals')
         .then(response => {
          console.log(response.data);
          setFestivals(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(festivals.length === 0) return <Text>No Festivals found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={festivals}
          renderItem={({item}) => <FestivalItem festival={item} />}
          keyExtractor={(festival: FestivalType) => festival._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
