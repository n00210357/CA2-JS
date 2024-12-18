import { useState } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        description: "",
        ceo_email: ""
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

        postRequest('https://ca-1-js.vercel.app/api/companies', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/companies/${data._id}`);
        });

        // console.log(data);

        // if(data && loading === false){
        //     router.push(`/companies/${data._id}`);
        // }
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text>Description</Text>
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={form.description}
                onChange={handleChange}
                id='description'
            />

            <Text>Ceo email</Text>
            <TextInput
                style={styles.input}
                placeholder='Ceo email'
                value={form.ceo_email}
                onChange={handleChange}
                id='ceo_email'
            />

            <Text>{error}</Text>

            <Button 
                onPress={handleSubmit}
                title="Submit"
                color="#841584"
            />
        </>
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