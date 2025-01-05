import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Work_hourType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';

export default function Page() {
    const [work_hour, setWork_hour] = useState<Work_hourType | null>(null);
    const { id } = useLocalSearchParams();
    
    useEffect(() => 
    { 
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

    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        start: "",
        end: "",
        mine_id: "",
        worker_email: "",
    });

    const { putRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {

        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);

        if (work_hour != null)
        {
            if (form.start == null || form.start == '')
            {
                form.start = work_hour.start
            }
    
            if (form.end == null || form.end == '')
            {
                form.end = work_hour.end
            }
    
            if (form.mine_id == null || form.mine_id == '')
            {
                form.mine_id = work_hour.mine_id
            }
    
            if (form.worker_email == null || form.worker_email == '')
            {
                form.worker_email = work_hour.worker_email
            }
        }

        putRequest(`https://ca-1-js.vercel.app/api/mineral_mines/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/mineral_mines/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    if(!work_hour) return <Text>work hours not found</Text>

    return (
        <View>
            <Text>Start</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.start}
                value={form.start}
                onChange={handleChange}
                id='start'
            />

            <Text>End</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.end}
                value={form.end}
                onChange={handleChange}
                id='end'
            />

            <Text>mine id</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.mine_id}
                value={form.mine_id}
                onChange={handleChange}
                id='mine_id'
            />

            <Text>Work email</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.worker_email}
                value={form.worker_email}
                onChange={handleChange}
                id='worker_email'
            />

            <Text>{error}</Text>

            <View style={styles.container}>
                <View style={styles.border}>
                    <Button style={styles.startBut}>
                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.butText2} >    Submit    </Text>
                        </Pressable>
                    </Button>
                </View>
            </View> 
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