import RegistorForm from '@/components/RegistorForm';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';

export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      
      <RegistorForm/>

      <Link href={{pathname: '/..',}}>
        <Button
          title="Back"
          color="blue"
        />
      </Link>

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
