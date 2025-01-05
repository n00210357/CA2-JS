import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Mineral_mineType, MineralType, MineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineItem from '@/components/MineItem';
import MineralItem from '@/components/MineralItem';

export default function Page() {
    const [mineral_mine, setMineral_mine] = useState<Mineral_mineType | null>(null);
    const { id } = useLocalSearchParams();
    const [minerals, setMineral] = useState([]);
    const [mines, setMine] = useState([]);
    let [miner] = useState([]);
    let [min] = useState([]);

    useEffect(() => 
    { 
        axios.get(`https://ca-1-js.vercel.app/api/mineral_mines/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                setMineral_mine(response.data);
             })
             .catch(e => {
                console.log(e);
             });
    
      }, [id]);

      useEffect(() => {    
                axios.get('https://ca-1-js.vercel.app/api/minerals')
                .then(response => {
                  console.log(response.data);
                  setMineral(response.data);
                })
                .catch(e => {
                  console.log(e);
                });  
              }, []);
        
      useEffect(() => {    
                axios.get('https://ca-1-js.vercel.app/api/mines')
                .then(response => {
                    console.log(response.data);
                    setMine(response.data);
                })
                .catch(e => {
                    console.log(e);
                });  
        }, []);

    const router = useRouter();
    const { session } = useSession();

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/mineral_mines/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!mineral_mine) return <Text>work hours not found</Text>

    miner = [];
    min = [];

    if (mineral_mine != null && minerals != null)
        {
            minerals.forEach(minera => {
                
                if (mineral_mine.mineral_id == minera["_id"])
                {
                    miner.push(minera)
                }
            });
        }
    
    if (mineral_mine != null && mines != null)
    {
        mines.forEach(minera => {
            if (mineral_mine.mine_id == minera["_id"])
            {
                min.push(minera)
            }
        });
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <Text>Are you sure you want to delete this</Text>

            <SafeAreaView>
                <FlatList
                    data={miner}
                    renderItem={({item}) => <MineralItem mineral={item} />}
                    keyExtractor={(mineral: MineralType) => mineral["_id"]}
                />         
            </SafeAreaView>
            
            <SafeAreaView>
                <FlatList
                    data={min}
                    renderItem={({item}) => <MineItem mine={item} />}
                    keyExtractor={(mine: MineType) => mine["_id"]}
                />         
            </SafeAreaView>

            <Text>{error}</Text>

            <Link href={{
                pathname: `/(auth)/(tabs)/minerals`,
                params: { id: mineral_mine._id }}} style={styles.border}>
                <Button onPress={handleSubmit} style={styles.startBut} variant="solid" action="negative">
                    <Text style={styles.butText2} >   Delete   </Text>
                </Button>
            </Link>
                        
            <Link href={{
                pathname: '/mineral_mines/[id]',
                params: { id: mineral_mine._id }}} style={styles.border}>
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