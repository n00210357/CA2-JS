import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';

export default function Page() {
    const [mine, setMine] = useState<MineType | null>(null);
    const { id } = useLocalSearchParams();
    
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

    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        latitude: "",
        longitude: "",
        manager_email: "",
        company_name: "",
        image_path: "",
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

        if (mine != null)
        {
            if (form.name == null || form.name == '')
            {
                form.name = mine.name
            }
    
            if (form.latitude == null || form.latitude == '')
            {
                form.latitude = mine.latitude
            }

            if (form.longitude == null || form.longitude == '')
            {
                form.longitude = mine.longitude
            }

            if (form.manager_email == null || form.manager_email == '')
            {
                form.manager_email = mine.manager_email
            }

            if (form.company_name == null || form.company_name == '')
            {
                form.company_name = mine.company_name
            }

            if ((mine.image_path != null || mine.image_path == '') && (form.image_path == null || form.image_path == ''))
            {
                form.image_path = mine.image_path
            }
        }

        putRequest(`https://ca-1-js.vercel.app/api/mines/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/mines/${id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    if(!mine) return <Text>mine not found</Text>

    return (
        <View>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.name}
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text>Latitude</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.latitude}
                value={form.latitude}
                onChange={handleChange}
                id='latitude'
            />

            <Text>Longitude</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.longitude}
                value={form.longitude}
                onChange={handleChange}
                id='longitude'
            />

            <Text>Manager email</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.manager_email}
                value={form.manager_email}
                onChange={handleChange}
                id='manager_email'
            />

            <Text>Company name</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.company_name}
                value={form.company_name}
                onChange={handleChange}
                id='company_name'
            />

            <Text>Image path</Text>
            <TextInput
                style={styles.input}
                placeholder={mine.image_path}
                value={form.image_path}
                onChange={handleChange}
                id='image_path'
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