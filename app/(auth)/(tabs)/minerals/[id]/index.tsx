import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Mineral_mineType, MineralType, MineType } from '@/types';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Mineral_mineItem from '@/components/Mineral_mineItem';

export default function Tab() {
  const [mineral, setMineral] = useState<MineralType | null>(null);
  const [mine, setMine] = useState<MineType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const [mineral_mines, setMineral_mine] = useState([]);
  let [min] = useState([]);

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/minerals/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }
        })
         .then(response => {
            console.log(response.data);
            setMineral(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  useEffect(() => {    
    axios.get('https://ca-1-js.vercel.app/api/mineral_mines')
    .then(response => {
      console.log(response.data);
      setMineral_mine(response.data);
    })
    .catch(e => {
      console.log(e);
    });  
  }, []);

  if(!mineral) return <Text>Minerals not found</Text>
  
  let img
  
  if (mineral.image_path != undefined && mineral.image_path != '' && mineral.image_path != 'http://api-image.s3.eu-west-1.amazonaws.com/undefined')
  {
    img = {uri: mineral?.image_path}
  }
  else
  {
    img = require('../../../../../assets/images/icon.png')
  }

  min = []

  mineral_mines.forEach(minera => 
  {
    if (mineral._id == minera["mineral_id"])
    {
      min.push(minera)
    }
  });
  
    return (
      <SafeAreaProvider style={styles.container}>
        <View style={styles.sides}>
  
          <Link href={{
                  pathname: '/minerals/[id]/edit',
                  params: { id: mineral._id }}} style={styles.border}>
              <Button style={styles.startBut} variant="solid" action="primary">
                <Text style={styles.butText2} >   Edit   </Text>
              </Button>
          </Link>
  
          <Link href={{
                  pathname: '/minerals/[id]/delete',
                  params: { id: mineral._id }}} style={styles.border}>
              <Button style={styles.startBut} variant="solid" action="negative">
                <Text style={styles.butText2} > Delete </Text>
              </Button>
          </Link>
        </View>
  
        <Image style={styles.image} source={img}>
        </Image>
  
        <Text style={styles.text}>{mineral.name}</Text>
  
        <Text>{mineral.description}</Text>

        <Link href={{
          pathname: '../mineral_mines/create',
          params: { id: mineral._id }}} style={styles.border}>
          <Button style={styles.startBut} variant="solid" action="primary">
            <Text style={styles.butText2} >Connect to a mine</Text>
          </Button>
        </Link>

        <Text style={styles.bigText}>mined at</Text>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={min}
            renderItem={({item}) => <Mineral_mineItem mineral_mine={item} />}
            keyExtractor={(mineral_mine: Mineral_mineType) => mineral_mine["_id"]}
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