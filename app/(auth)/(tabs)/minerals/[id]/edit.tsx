import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineralType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
    const [mineral, setMineral] = useState<MineralType | null>(null);
    const { id } = useLocalSearchParams();
    
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

    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        description: "",
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

        if (mineral != null)
        {
            if (form.name == null || form.name == '')
            {
                form.name = mineral.name
            }
    
            if (form.description == null || form.description == '')
            {
                form.description = mineral.description
            }
    
            if ((mineral.image_path != null || mineral.image_path == '') && (form.image_path == null || form.image_path == ''))
            {
                form.image_path = mineral.image_path
            }
        }

        putRequest(`https://ca-1-js.vercel.app/api/minerals/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/minerals/${id}`);
        });

    }

    if(loading === true) return <Text>Loading API...</Text>
    if(!mineral) return <Text>mineral not found</Text>

    return (
        <View>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={mineral.name}
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text>Description</Text>
            <TextInput
                style={styles.input}
                placeholder={mineral.description}
                value={form.description}
                onChange={handleChange}
                id='description'
            />

            <Text>Image path</Text>
            <TextInput
                style={styles.input}
                placeholder={mineral.image_path}
                value={form.image_path}
                onChange={handleChange}
                id='image_path'
            />

            <Text>{error}</Text>

            <Button 
                onPress={handleSubmit}
                title="Submit"
                color="#841584"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});