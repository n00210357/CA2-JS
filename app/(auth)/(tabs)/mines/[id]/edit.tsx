import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

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

        // console.log(data);

        // if(data && loading === false){
        //     router.push(`/mines/${data._id}`);
        // }
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