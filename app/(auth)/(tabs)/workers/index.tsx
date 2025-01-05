import { Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import WorkerItem from '@/components/WorkerItem';
import { WorkerType } from '@/types';

//the workers page
export default function Tab() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    //grab all the workers
    axios.get('https://ca-1-js.vercel.app/api/workers')
         .then(response => {
          console.log(response.data);
          setWorkers(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  //checks if their are any workers
  if(workers.length === 0) return <Text>No Workers found</Text>
  
  //displays all the workers
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={workers}
          renderItem={({item}) => <WorkerItem worker={item} />}
          keyExtractor={(worker: WorkerType) => worker._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

//the workers page styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
