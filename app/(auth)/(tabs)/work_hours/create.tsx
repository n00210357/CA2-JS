import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        start: "",
        end: "",
        mine_id: "",
        worker_email: "",
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

        postRequest('https://ca-1-js.vercel.app/api/work_hours', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/home`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <View>
            <Text>Starting</Text>
            <TextInput
                style={styles.input}
                placeholder='Starting'
                value={form.start}
                onChange={handleChange}
                id='start'
            />

            <Text>Ending</Text>
            <TextInput
                style={styles.input}
                placeholder='Ending'
                value={form.end}
                onChange={handleChange}
                id='end'
            />

            <Text>Mine id</Text>
            <TextInput
                style={styles.input}
                placeholder='Mine id'
                value={form.mine_id}
                onChange={handleChange}
                id='mine_id'
            />

            <Text>Worker email</Text>
            <TextInput
                style={styles.input}
                placeholder='Worker email'
                value={form.worker_email}
                onChange={handleChange}
                id='worker_email'
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