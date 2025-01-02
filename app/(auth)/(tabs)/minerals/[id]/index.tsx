import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { MineralType } from '@/types';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
  const [mineral, setMineral] = useState<MineralType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();

  useEffect(() => {
    
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

  if(!mineral) return <Text>Minerals not found</Text>
  
  return (
    <View style={styles.container}>
      <View>
        <Link href={
            {
                pathname: '/minerals/[id]/edit',
                params: { id: mineral._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Edit</ButtonText>
          </Button>
        </Link>

        <Link href={
            {
                pathname: '/minerals/[id]/delete',
                params: { id: mineral._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Delete</ButtonText>
          </Button>
        </Link>
      </View>

      <Text>{mineral.name}</Text>
      <Text>{mineral.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
