import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Mineral_mineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';

export default function Page() {
    const [mineral_mine, setMineral_mine] = useState<Mineral_mineType | null>(null);
    const { id } = useLocalSearchParams();
    
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

    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        mineral_id: "",
        mine_id: "",
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

        if (mineral_mine != null)
        {    
            if (form.mineral_id == null || form.mineral_id == '')
            {
                form.mineral_id = mineral_mine.mineral_id
            }
    
            if (form.mine_id == null || form.mine_id == '')
            {
                form.mine_id = mineral_mine.mine_id
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
    if(!mineral_mine) return <Text>work hours not found</Text>

    return (
        <View>
            <Text>mineral id</Text>
            <TextInput
                style={styles.input}
                placeholder={mineral_mine.mineral_id}
                value={form.mineral_id}
                onChange={handleChange}
                id='mineral_id'
            />

            <Text>Mine id</Text>
            <TextInput
                style={styles.input}
                placeholder={mineral_mine.mine_id}
                value={form.mine_id}
                onChange={handleChange}
                id='mine_id'
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