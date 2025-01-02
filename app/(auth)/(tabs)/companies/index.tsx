import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CompanyItem from '@/components/CompanyItem';
import { CompanyType } from '@/types';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';

export default function Tab() {
  const [companies, setCampanies] = useState([]);

  useEffect(() => {
    
    axios.get('https://ca-1-js.vercel.app/api/companies')
         .then(response => {
          console.log(response.data);
          setCampanies(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(companies.length === 0) 
    return ( 
    <View style={styles.but}>
      <Link href={{pathname: '/(auth)/(tabs)/companies/create'}}>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Create</ButtonText>
        </Button>
      </Link>
  
      <Text>No Companies found</Text>
    </View>
    )
  
  return (
    <View style={styles.but}>
    <Link href={{pathname: '/(auth)/(tabs)/companies/create'}}>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Create</ButtonText>
      </Button>
    </Link>

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={companies}
          renderItem={({item}) => <CompanyItem company={item} />}
          keyExtractor={(company: CompanyType) => company._id}
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
