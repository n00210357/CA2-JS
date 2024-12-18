import LoginForm from '@/components/LoginForm';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import { useRouter } from 'expo-router';

const router = useRouter();

export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>

      {
        (session) ? 
        (
          <View>
          <Button>
            <Pressable onPress={home}>
              <Text>Home Page</Text>
            </Pressable>
          </Button>          

          <Button>
            <Pressable onPress={signOut}>
                <Text>Logout</Text>
            </Pressable>
          </Button>    
          </View>      
        ) 
        : 
        (
          <LoginForm/>
        )
      }
      
    </View>
  );
}

function home()
{
  router.push('../(auth)/(tabs)/home');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
