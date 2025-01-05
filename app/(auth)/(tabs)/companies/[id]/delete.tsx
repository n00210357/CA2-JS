import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { CompanyType, WorkerType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import WorkerItem from '@/components/WorkerItem';

export default function Page() {
    const [company, setCompany] = useState<CompanyType | null>(null);
    const [workers, setWorkers] = useState([]);
    const { id } = useLocalSearchParams();
    let [ceo] = useState([]);

    useEffect(() => 
    { 
        axios.get(`https://ca-1-js.vercel.app/api/companies/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
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
                setWorkers(response.data);
            })
            .catch(e => {
            console.log(e);
        });        
    }, []);

    const router = useRouter();
    const { session } = useSession();

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/companies/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!company) return <Text>Mineral not found</Text>

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
            <Text>Are you sure you want to delete this</Text>
            
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

            <Text>{error}</Text>

            <Link href={{
                pathname: `/(auth)/(tabs)/companies`,
                params: { id: company._id }}} style={styles.border}>
                <Button onPress={handleSubmit} style={styles.startBut} variant="solid" action="negative">
                    <Text style={styles.butText2} >   Delete   </Text>
                </Button>
            </Link>
            
            <Link href={{
                pathname: '/companies/[id]',
                params: { id: company._id }}} style={styles.border}>
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