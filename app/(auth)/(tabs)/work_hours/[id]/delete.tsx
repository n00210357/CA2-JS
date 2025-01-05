import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { WorkerType, MineType, Work_hourType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineItem from '@/components/MineItem';
import WorkerItem from '@/components/WorkerItem';

export default function Page() {
    const [work_hour, setWork_hour] = useState<Work_hourType | null>(null);
    const [workers, setWorkers] = useState([]);
    const [mines, setMine] = useState([]);
    const { id } = useLocalSearchParams();
    let [work] = useState([]);
    let [min] = useState([]);

    useEffect(() => 
    { 
        //grabs a work hour
        axios.get(`https://ca-1-js.vercel.app/api/work_hours/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                setWork_hour(response.data);
             })
             .catch(e => {
                console.log(e);
             });
    
      }, [id]);

      //filters work hours worker
    useEffect(() => {    
        axios.get('https://ca-1-js.vercel.app/api/workers')
        .then(response => {
            setWorkers(response.data);
        })
        .catch(e => {
            console.log(e);
        });  
    }, []);
        
    //filters a work hours mine
    useEffect(() => {    
        axios.get('https://ca-1-js.vercel.app/api/mines')
        .then(response => {
            setMine(response.data);
        })
        .catch(e => {
            console.log(e);
        });  
    }, []);

    const router = useRouter();
    const { session } = useSession();

    const { data, loading, error } = useAPI();

    //deletes the work hour
    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/work_hours/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    work = [];
    min = [];

    if(loading === true) return <Text>Loading API...</Text>

    if(!work_hour) return <Text>work hours not found</Text>

    if (work_hour != null && workers != null)
        {
            workers.forEach(minera => {
                
                if (work_hour.worker_email == minera["email"])
                {
                    work.push(minera)
                }
            });
        }
    
        if (work_hour != null && mines != null)
        {
          mines.forEach(minera => {

            if (work_hour.mine_id == minera["_id"])
            {
              min.push(minera)
            }
          });
        }

        //the work hour warning
    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.text}>Are you sure you want to delete this</Text>
            
            <View style={styles.sides}>
                <Text style={styles.text}>Starts</Text>
                <Text style={styles.bigText}>{work_hour.start}</Text>
            
                <Text style={styles.text}>Ends</Text>
                <Text style={styles.bigText}>{work_hour.end}</Text>
            </View>

            <Text>{error}</Text>

            <SafeAreaView>
                <FlatList
                    data={work}
                    renderItem={({item}) => <WorkerItem worker={item} />}
                    keyExtractor={(worker: WorkerType) => worker["_id"]}
                />         
            </SafeAreaView>
            
            <SafeAreaView>
                <FlatList
                    data={min}
                    renderItem={({item}) => <MineItem mine={item} />}
                    keyExtractor={(mine: MineType) => mine["_id"]}
                />         
            </SafeAreaView>

            <Link href={{
                pathname: `/(auth)/(tabs)/home`,
                params: { id: work_hour._id }}} style={styles.border}>
                <Button onPress={handleSubmit} style={styles.startBut} variant="solid" action="negative">
                    <Text style={styles.butText2} >   Delete   </Text>
                </Button>
            </Link>
                        
            <Link href={{
                pathname: '/work_hours/[id]',
                params: { id: work_hour._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                    <Text style={styles.butText2} > Back </Text>
                </Button>
            </Link>
        </SafeAreaProvider>
    );
}
            
//work hour styles
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
                  paddingHorizontal: 10
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