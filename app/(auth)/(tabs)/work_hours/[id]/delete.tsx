import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Work_hourType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';

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

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/work_hours/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!work_hour) return <Text>work hours not found</Text>

    return (
        <View>
            <Text>Are you sure you want to delete this</Text>
            
            <Text>{work_hour.start}</Text>

            <Text>{work_hour.end}</Text>

            <Text>{work_hour.mine_id}</Text>

            <Text>{work_hour.worker_email}</Text>

            <Text>{error}</Text>

            <Link href={{pathname: `/(auth)/(tabs)/home`}}>
                <Button onPress={handleSubmit} size="md" variant="solid" action="primary">
                    <ButtonText>DELETE</ButtonText>
                </Button>
            </Link>
            

            <Link href={
            {
                pathname: '/work_hours/[id]',
                params: { id: work_hour._id }
            }}>
                <Button size="md" variant="solid" action="primary">
                    <ButtonText>Back</ButtonText>
                </Button>
            </Link>
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