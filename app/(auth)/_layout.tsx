import { Text } from 'react-native';
import { Slot, Redirect } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { IAuthContext } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function Root() {
    const { session, isLoading }:any = useSession();

    if(isLoading){
        return <Text>Loading...</Text>
    }

    if(!session){
        return <Redirect href='/' />
    }

    return (
        <Slot />
    );
}