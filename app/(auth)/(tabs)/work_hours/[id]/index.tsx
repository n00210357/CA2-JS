import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { WorkerType, MineType, Work_hourType } from '@/types';
import { Button } from "@/components/ui/button"
import { Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MineItem from '@/components/MineItem';
import WorkerItem from '@/components/WorkerItem';

export default function Tab() {
  const [work_hours, setWork_hour] = useState<Work_hourType | null>(null);
  const [workers, setWorkers] = useState([]);
  const [mines, setMine] = useState([]);
  const { id } = useLocalSearchParams();
  let [work] = useState([]);
  let [min] = useState([]);

  //grabs a work hour
  useEffect(() => {
    axios.get(`https://ca-1-js.vercel.app/api/work_hours/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
            }
        })
         .then(response => {
            setWork_hour(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  //filters through all the workers
  useEffect(() => {    
          axios.get('https://ca-1-js.vercel.app/api/workers')
          .then(response => {
            setWorkers(response.data);
          })
          .catch(e => {
            console.log(e);
          });  
        }, []);
        
        //filter through all the mine
      useEffect(() => {    
          axios.get('https://ca-1-js.vercel.app/api/mines')
          .then(response => {
              setMine(response.data);
          })
          .catch(e => {
              console.log(e);
          });  
          }, []);
  
      work = [];
      min = [];

  if(!work_hours) return <Text>work hours not found</Text>
  
  //grabs the work hour worker
  if (work_hours != null && workers != null)
    {
        workers.forEach(minera => {
            
            if (work_hours.worker_email == minera["email"])
            {
                work.push(minera)
            }
        });
    }

    //grabs the work hour mine
    if (work_hours != null && mines != null)
    {
      mines.forEach(minera => {
        if (work_hours.mine_id == minera["_id"])
        {
          min.push(minera)
        }
      });
    }

    //a work hour
  return (
        <SafeAreaProvider style={styles.container}>
          <View style={styles.sides}>
    
            <Link href={{
                    pathname: '/work_hours/[id]/edit',
                    params: { id: work_hours._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                  <Text style={styles.butText2} >   Edit   </Text>
                </Button>
            </Link>
    
            <Link href={{
                    pathname: '/work_hours/[id]/delete',
                    params: { id: work_hours._id }}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="negative">
                  <Text style={styles.butText2} > Delete </Text>
                </Button>
            </Link>
          </View>

          <View style={styles.sides}>
          <Text style={styles.text}>Starts</Text>
          <Text style={styles.bigText}>{work_hours.start}</Text>

          <Text style={styles.text}>Ends</Text>
          <Text style={styles.bigText}>{work_hours.end}</Text>
          </View>

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
        </SafeAreaProvider>
      );
    }
    
    //a work hour style
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
        paddingHorizontal: 10
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

