import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { MineType } from '@/types';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
  const [mine, setMine] = useState<MineType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();

  useEffect(() => {
    
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

  if(!mine) return <Text>Mine not found</Text>
  
  return (
    <View style={styles.container}>
      <View>
        <Link href={
            {
                pathname: '/mines/[id]/edit',
                params: { id: mine._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Edit</ButtonText>
          </Button>
        </Link>

        <Link href={
            {
                pathname: '/mines/[id]/delete',
                params: { id: mine._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Delete</ButtonText>
          </Button>
        </Link>
      </View>

      <Text>{mine.name}</Text>
      <Text>{mine.manager_email}</Text>
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
