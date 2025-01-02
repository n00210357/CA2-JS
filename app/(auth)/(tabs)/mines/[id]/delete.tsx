import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';

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

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/mines/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });

        // console.log(data);

        // if(data && loading === false){
        //     router.push(`/mines/${data._id}`);
        // }
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!mine) return <Text>Mine not found</Text>

    return (
        <View>
            <Text>Are you sure you want to delete this</Text>
            
            <Text>{mine.name}</Text>

            <Text>{mine.latitude}</Text>

            <Text>{mine.longitude}</Text>

            <Text>{mine.manager_email}</Text>

            <Text>{mine.company_name}</Text>

            <Text>{mine.image_path}</Text>

            <Text>{error}</Text>

            <Link href={{pathname: `/(auth)/(tabs)/mines`}}>
                <Button onPress={handleSubmit} size="md" variant="solid" action="primary">
                    <ButtonText>DELETE</ButtonText>
                </Button>
            </Link>
            

            <Link href={
                {
                    pathname: '/mines/[id]',
                    params: { id: mine._id }
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