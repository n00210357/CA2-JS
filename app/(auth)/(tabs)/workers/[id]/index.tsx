import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { WorkerType } from '@/types';
import { useSession } from '@/contexts/AuthContext';


export default function Tab() {
  const [workers, setWorker] = useState<WorkerType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/workers/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
         .then(response => {
            console.log(response.data);
            setWorker(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!workers) return <Text>Worker not found</Text>
  
  return (
    <View style={styles.container}>
        <Text>{workers.full_name}</Text>
        <Text>{workers.description}</Text>
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
