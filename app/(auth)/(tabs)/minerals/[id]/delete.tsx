import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { MineralType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';

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

    const { data, loading, error } = useAPI();

    const handleSubmit = () => {
        axios.delete(`https://ca-1-js.vercel.app/api/minerals/${id}`,{
            headers: {
                Authorization: `Bearer ${session}`
            }
        });

        // console.log(data);

        // if(data && loading === false){
        //     router.push(`/minerals/${data._id}`);
        // }
    }

    if(loading === true) return <Text>Loading API...</Text>

    if(!mineral) return <Text>Mineral not found</Text>

    return (
        <View>
            <Text>Are you sure you want to delete this</Text>
            
            <Text>{mineral.name}</Text>

            <Text>{mineral.description}</Text>

            <Text>{mineral.image_path}</Text>

            <Text>{error}</Text>

            <Link href={{pathname: `/(auth)/(tabs)/minerals`}}>
                <Button onPress={handleSubmit} size="md" variant="solid" action="primary">
                    <ButtonText>DELETE</ButtonText>
                </Button>
            </Link>
            

            <Link href={
                {
                    pathname: '/minerals/[id]',
                    params: { id: mineral._id }
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