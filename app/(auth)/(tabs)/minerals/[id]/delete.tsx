import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineralType, Mineral_mineType, MineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Mineral_mineItem from '@/components/Mineral_mineItem';

export default function Page() {
    const [mineral, setMineral] = useState<MineralType | null>(null);
    const [mine, setMine] = useState<MineType | null>(null);
    const { id } = useLocalSearchParams();
    const [mineral_mines, setMineral_mine] = useState([]);
    let [min] = useState([]);

    useEffect(() => 
    { 
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

    const router = useRouter();
    const { session } = useSession();

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/minerals/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!mineral) return <Text>Mineral not found</Text>

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
            <Text style={styles.text} >Are you sure you want to delete this</Text>
   
            <Image style={styles.image} source={img}>
            </Image>
   
            <Text style={styles.bigText}>{mineral.name}</Text>
               
            <Text style={styles.smallText}>{mineral.description}</Text>
   
            <Text>{error}</Text>
   
            <FlatList
                data={min}
                renderItem={({item}) => <Mineral_mineItem mineral_mine={item} />}
                keyExtractor={(mineral_mine: Mineral_mineType) => mineral_mine["_id"]}
            />            
   
            <Link href={{
                pathname: `/(auth)/(tabs)/minerals`,
                params: { id: mineral._id }}} style={styles.border}>
                <Button onPress={handleSubmit} style={styles.startBut} variant="solid" action="negative">
                    <Text style={styles.butText2} >   Delete   </Text>
                </Button>
            </Link>
                           
            <Link href={{
                pathname: '/minerals/[id]',
                params: { id: mineral._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                    <Text style={styles.butText2} > Back </Text>
                </Button>
            </Link>
   
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
           fontSize: 24,
           justifyContent: 'center',
           alignItems: 'center',
           fontWeight: 'bold',
           color: "white"
       },
   
       smallText:
       {
         fontSize: 12,
         justifyContent: 'center',
         alignItems: 'center',
         paddingVertical: 10,
         paddingHorizontal: 5,
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
           maxWidth: 50,
           maxHeight: 50,
       }
   });