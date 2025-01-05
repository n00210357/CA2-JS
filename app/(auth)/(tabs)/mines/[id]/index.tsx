import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { CompanyType, WorkerType, MineType } from '@/types';
import { Button } from "@/components/ui/button"
import { Link } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CompanyItem from '@/components/CompanyItem';
import WorkerItem from '@/components/WorkerItem';

export default function Tab() {
  const [mine, setMine] = useState<MineType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const [workers, setWorkers] = useState([]);
  const [companies, setCompany] = useState([]);
  let [ceo] = useState([]);
  let [comp] = useState([]);

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/mines/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }
        })
         .then(response => {
            console.log(response.data);
            setMine(response.data);
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

  useEffect(() => {    
    axios.get('https://ca-1-js.vercel.app/api/companies')
    .then(response => {
      console.log(response.data);
      setCompany(response.data);
    })
    .catch(e => {
      console.log(e);
    });  
  }, []);

  if(!mine) return <Text>Mine not found</Text>

  ceo = []

  workers.forEach(wor => 
  {
    if (mine.manager_email.toLowerCase() == wor["email"])
    {
      ceo.push(wor)
    }
  });

  comp = []

  companies.forEach(com => 
  {
    if (mine.company_name == com["name"])
    {
      comp.push(com)
    }
  });

  let img
  
    if (mine.image_path != undefined && mine.image_path != '' && mine.image_path != 'http://api-image.s3.eu-west-1.amazonaws.com/undefined')
    {
      img = {uri: mine?.image_path}
    }
    else
    {
      img = require('../../../../../assets/images/icon.png')
    }
  
    return (
      <View>
          <View style={styles.sides}>
  
          <Link href={{
                  pathname: '/mines/[id]/edit',
                  params: { id: mine._id }}} style={styles.border}>
              <Button style={styles.startBut} variant="solid" action="primary">
                <Text style={styles.butText2} >   Edit   </Text>
              </Button>
          </Link>
  
          <Link href={{
                  pathname: '/mines/[id]/delete',
                  params: { id: mine._id }}} style={styles.border}>
              <Button style={styles.startBut} variant="solid" action="negative">
                <Text style={styles.butText2} > Delete </Text>
              </Button>
          </Link>
        </View>

    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={img}>
        </Image>
  
        <Text style={styles.text}>{mine.name}</Text>

        <View style={styles.sides}>
          <Text style={styles.bigText}>latitude</Text>
          <Text style={styles.smallText}>{mine.latitude}</Text>

          <Text style={styles.bigText}>longitude</Text>
          <Text style={styles.smallText}>{mine.longitude}</Text>
        </View>

        <Text style={styles.text}>The manager is </Text>
              <FlatList
                data={ceo}
                renderItem={({item}) => <WorkerItem worker={item} />}
                keyExtractor={(worker: WorkerType) => worker["_id"]}
              />         

          <Text style={styles.text}>Owned by the company</Text>
            <FlatList
              data={comp}
              renderItem={({item}) => <CompanyItem company={item} />}
              keyExtractor={(company: CompanyType) => company["_id"]}
            />         
        </SafeAreaView>
      </SafeAreaProvider>
      </View>
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

    smallText:
    {
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
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
      paddingVertical: 20,
      paddingHorizontal: 30,
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
      maxWidth: 200,
      maxHeight: 200,
    }
  });