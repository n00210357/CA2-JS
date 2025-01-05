import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineType, CompanyType, WorkerType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CompanyItem from '@/components/CompanyItem';
import WorkerItem from '@/components/WorkerItem';

export default function Page() {
    const [mine, setMine] = useState<MineType | null>(null);
    const { id } = useLocalSearchParams();
    const [workers, setWorkers] = useState([]);
    const [companies, setCompany] = useState([]);
    let [ceo] = useState([]);
    let [comp] = useState([]);

    //grabs the mine
    useEffect(() => 
    { 
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

      //grabs the workers
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
      
        //grabs the companies
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

    const router = useRouter();
    const { session } = useSession();

    const { data, loading, error } = useAPI();

    //deletes the mine
    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/mines/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!mine) return <Text>Mine not found</Text>

    ceo = []

    //grabs the mines manager
    workers.forEach(wor => 
    {
        if (mine.manager_email.toLowerCase() == wor["email"])
        {
            ceo.push(wor)
        }
    });

    comp = []
    
    //grabs the mines company
    companies.forEach(com => 
    {
        if (mine.company_name.toLowerCase() == com["name"])
        {
            comp.push(com)
        }
    });

    //checks if mine has image
    let img
          
    if (mine.image_path != undefined && mine.image_path != '' && mine.image_path != 'http://api-image.s3.eu-west-1.amazonaws.com/undefined')
    {
        img = {uri: mine.image_path}
    }
    else
    {
        img = require('../../../../../assets/images/icon.png')
    }
    
    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.text} >Are you sure you want to delete this</Text>

            <Image style={styles.image} source={img}>
            </Image>

            <Text style={styles.bigText}>{mine.name}</Text>
            
            <View style={styles.sides}>
                <Text style={styles.bigText}>latitude</Text>
                <Text style={styles.smallText}>{mine.latitude}</Text>
            
                <Text style={styles.bigText}>longitude</Text>
                <Text style={styles.smallText}>{mine.longitude}</Text>
            </View>

            <Text>{error}</Text>

            <Text style={styles.bigText}>The manager is </Text>
                <FlatList
                    data={ceo}
                    renderItem={({item}) => <WorkerItem worker={item} />}
                    keyExtractor={(worker: WorkerType) => worker["_id"]}
                />         
           
            <Text style={styles.bigText}>Owned by the company</Text>
                <FlatList
                    data={comp}
                    renderItem={({item}) => <CompanyItem company={item} />}
                    keyExtractor={(company: CompanyType) => company["_id"]}
                />      

            <Link href={{
                pathname: `/(auth)/(tabs)/mines`,
                params: { id: mine._id }}} style={styles.border}>
                <Button onPress={handleSubmit} style={styles.startBut} variant="solid" action="negative">
                    <Text style={styles.butText2} >   Delete   </Text>
                </Button>
            </Link>
                        
            <Link href={{
                pathname: '/mines/[id]',
                params: { id: mine._id }}} style={styles.border}>
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
        fontSize: 24,
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