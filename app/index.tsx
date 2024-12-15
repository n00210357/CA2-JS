import LoginForm from '@/components/LoginForm';
import { View, Text, StyleSheet, } from 'react-native'; //Button
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>

          <Link href={{pathname: '/login',}}>
            <Button size="md" variant="solid" action="primary">
              <ButtonText>Login</ButtonText>
            </Button>
          </Link>
        
          <Link href={{pathname: '/registor',}}>
            <Button size="md" variant="solid" action="primary">
              <ButtonText>Registor</ButtonText>
            </Button>
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
