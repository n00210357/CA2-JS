import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineItem from '@/components/MineItem';
import { MineType } from '@/types';

export default function Tab() {
  const [mines, setFestivals] = useState([]);

  useEffect(() => {
    
    axios.get('https://ca-1-js.vercel.app/api/mines')
         .then(response => {
          console.log(response.data);
          setFestivals(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(mines.length === 0) return <Text>No Mines found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mines}
          renderItem={({item}) => <MineItem mine={item} />}
          keyExtractor={(mine: MineType) => mine._id}
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
