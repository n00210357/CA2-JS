import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineralItem from '@/components/MineralItem';
import { MineralType } from '@/types';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import { Link } from 'expo-router';

export default function Tab() {
  const [minerals, setFestivals] = useState([]);

  useEffect(() => {
    
    axios.get('https://ca-1-js.vercel.app/api/minerals')
         .then(response => {
          console.log(response.data);
          setFestivals(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(minerals.length === 0) 
    return ( 
    <View style={styles.but}>
      <Link href={{pathname: '/(auth)/(tabs)/minerals/create'}}>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Create</ButtonText>
        </Button>
      </Link>
  
      <Text>No Minerals found</Text>
    </View>
    )
  
  return (
    <View style={styles.but}>
    <Link href={{pathname: '/(auth)/(tabs)/minerals/create'}}>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Create</ButtonText>
      </Button>
    </Link>

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={minerals}
          renderItem={({item}) => <MineralItem mineral={item} />}
          keyExtractor={(mineral: MineralType) => mineral._id}
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