import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Work_hourType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

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

        putRequest(`https://ca-1-js.vercel.app/api/work_hours/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/work_hours/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    if(!work_hour) return <Text>work hours not found</Text>

    return (
        <View>
            <Text>Starting</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.start}
                value={form.start}
                onChange={handleChange}
                id='start'
            />

            <Text>Ending</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.end}
                value={form.end}
                onChange={handleChange}
                id='end'
            />

            <Text>Mine id</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.mine_id}
                value={form.mine_id}
                onChange={handleChange}
                id='mine_id'
            />

            <Text>Worker email</Text>
            <TextInput
                style={styles.input}
                placeholder={work_hour.worker_email}
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