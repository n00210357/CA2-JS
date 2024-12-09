import LoginForm from '@/components/LoginForm';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';

export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>

          <Link href={{pathname: '/login',}}>
            <Button
              title="Login"
              color="red"
            />
          </Link>
        
          <Link href={{pathname: '/registor',}}>
            <Button
              title="Registor"
              color="red"
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
