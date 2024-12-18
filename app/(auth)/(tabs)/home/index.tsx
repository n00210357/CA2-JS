import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Work_hourItem from '@/components/Work_hourItem';
import { Work_hourType } from '@/types';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import { Link } from 'expo-router';

export default function Tab() {
  const [work_hours, setWork_hours] = useState([]);

  useEffect(() => {
    
    axios.get('https://ca-1-js.vercel.app/api/work_hours')
         .then(response => {
          console.log(response.data);
          setWork_hours(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(work_hours.length === 0) 
  return ( 
  <View style={styles.but}>
    <Link href={{pathname: '/(auth)/(tabs)/work_hours/create'}}>
      <Button size="md" variant="solid" action="primary">
        <ButtonText>Create</ButtonText>
      </Button>
    </Link>

    <Text>No Work_hour found</Text>
  </View>
  )
  
  return (
    <View style={styles.but}>
        <Link href={{pathname: '/(auth)/(tabs)/work_hours/create'}}>
            <Button size="md" variant="solid" action="primary">
              <ButtonText>Create</ButtonText>
          </Button>
        </Link>

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={work_hours}
          renderItem={({item}) => <Work_hourItem work_hour={item} />}
          keyExtractor={(work_hour: Work_hourType) => work_hour._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  but: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
