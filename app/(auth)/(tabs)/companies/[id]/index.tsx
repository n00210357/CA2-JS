import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { CompanyType, WorkerType } from '@/types';
import { Button } from "@/components/ui/button"
import { Link } from 'expo-router';
import WorkerItem from '@/components/WorkerItem';

export default function Tab() {
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [workers, setWorkers] = useState([]);
  const { id } = useLocalSearchParams();
  let [ceo] = useState([]);

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/companies/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
            }
        })
         .then(response => {
            console.log(response.data);
            setCompany(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);
  
    useEffect(() => {
      
    axios.get('https://ca-1-js.vercel.app/api/workers')
         .then(response => {
            console.log(response.data);
            setWorkers(response.data);
           })
           .catch(e => {
            console.log(e);
           });
  
    }, []);

  if(!company) return <Text>Company not found</Text>

  ceo = []

  workers.forEach(wor => 
  {
    if (company.ceo_email.toLowerCase() == wor["email"])
    {
      ceo.push(wor)
    }
  });

  let img

  if (company.image_path != undefined && company.image_path != '' && company.image_path != 'http://api-image.s3.eu-west-1.amazonaws.com/undefined')
  {
    img = {uri: company?.image_path}
  }
  else
  {
    img = require('../../../../../assets/images/icon.png')
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.sides}>

        <Link href={{
                pathname: '/companies/[id]/edit',
                params: { id: company._id }}} style={styles.border}>
            <Button style={styles.startBut} variant="solid" action="primary">
              <Text style={styles.butText2} >   Edit   </Text>
            </Button>
        </Link>

        <Link href={{
                pathname: '/companies/[id]/delete',
                params: { id: company._id }}} style={styles.border}>
            <Button style={styles.startBut} variant="solid" action="negative">
              <Text style={styles.butText2} > Delete </Text>
            </Button>
        </Link>
      </View>

      <Image style={styles.image} source={img}>
      </Image>

      <Text style={styles.text}>{company.name}</Text>

      <Text>{company.description}</Text>

      <Text style={styles.bigText} >The CEO is</Text>

        <SafeAreaView style={styles.container}>
            <FlatList
              data={ceo}
              renderItem={({item}) => <WorkerItem worker={item} />}
              keyExtractor={(worker: WorkerType) => worker["_id"]}
            />         
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sides: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bigText:
  {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold", 
  },

  input: 
  {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10
  },

  startBut:
  {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },

  text:
  {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  butText2:
  {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: "white"
  },

  border:
  {
    borderWidth:  5,
    borderStyle: "solid",
    borderRadius: 12,
    borderColor: "black",
    marginVertical: 10,
    marginHorizontal: 10,
    },

  image:
  {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 10,
    minHeight: 10,
    maxWidth: 300,
    maxHeight: 300,
  }
});