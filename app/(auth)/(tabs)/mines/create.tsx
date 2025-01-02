import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        latitude: "",
        longitude: "",
        manager_email: "",
        company_name: "",
    });

    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);

        postRequest('https://ca-1-js.vercel.app/api/mines', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/mines`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <View>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text>Latitude</Text>
            <TextInput
                style={styles.input}
                placeholder='Latitude'
                value={form.latitude}
                onChange={handleChange}
                id='latitude'
            />

            <Text>Longitude</Text>
            <TextInput
                style={styles.input}
                placeholder='Longitude'
                value={form.longitude}
                onChange={handleChange}
                id='longitude'
            />

            <Text>Managers email</Text>
            <TextInput
                style={styles.input}
                placeholder='Managers email'
                value={form.manager_email}
                onChange={handleChange}
                id='manager_email'
            />

            <Text>Company</Text>
            <TextInput
                style={styles.input}
                placeholder='Company'
                value={form.company_name}
                onChange={handleChange}
                id='company_name'
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