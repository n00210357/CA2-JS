import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Mineral_mineType, MineralType, MineType } from '@/types';
import { Button, ButtonText} from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineItem from '@/components/MineItem';
import MineralItem from '@/components/MineralItem';

export default function Tab() {
  const [mineral_mines, setMineral_mine] = useState<Mineral_mineType | null>(null);
  const [minerals, setMineral] = useState([]);
  const [mines, setMine] = useState([]);
  const { id } = useLocalSearchParams();
  let [miner] = useState([]);
  let [min] = useState([]);

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/mineral_mines/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
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
  
      miner = [];
      min = [];

  if(!mineral_mines) return <Text>work hours not found</Text>
  
  if (mineral_mines != null && minerals != null)
    {
        minerals.forEach(minera => {
            
            if (mineral_mines.mineral_id == minera["_id"])
            {
                miner.push(minera)
            }
        });
    }

    if (mineral_mines != null && mines != null)
    {
        mines.forEach(minera => {
            if (mineral_mines.mine_id == minera["_id"])
            {
                min.push(minera)
            }
        });
    }

  return (
        <SafeAreaProvider style={styles.container}>
          <View style={styles.sides}>
    
            <Link href={{
                    pathname: '/mineral_mines/[id]/edit',
                    params: { id: mineral_mines._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                  <Text style={styles.butText2} >   Edit   </Text>
                </Button>
            </Link>
    
            <Link href={{
                    pathname: '/mineral_mines/[id]/delete',
                    params: { id: mineral_mines._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="negative">
                  <Text style={styles.butText2} > Delete </Text>
                </Button>
            </Link>
          </View>
  
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
