import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { WorkerType } from '@/types';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
  const jwt = require('jsonwebtoken');
  const [worker, setWorker] = useState<WorkerType | null>(null);
  const { id } = useLocalSearchParams();
  
  //const { session } = useSession();

  //const decode = jwt.decode(session)

  //console.log(decode)

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/workers/${id}`)
         .then(response => {
            console.log(response.data);
            setWorker(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!worker) return <Text>Worker not found</Text> 
  
  return (
    <View style={styles.container}>
        <Text>{worker.full_name}</Text>
        <Text>{worker.description}</Text>
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
