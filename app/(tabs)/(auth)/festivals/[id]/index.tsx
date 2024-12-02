import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { FestivalType } from '@/types';


export default function Tab() {
  const [festival, setFestival] = useState<FestivalType | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    
    axios.get(`https://festivals-api.vercel.app/api/festivals/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
            }
        })
         .then(response => {
            console.log(response.data);
            setFestival(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!festival) return <Text>Festival not found</Text>
  
  return (
    <View style={styles.container}>
        <Text>{festival.title}</Text>
        <Text>{festival.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
