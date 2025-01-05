import LoginForm from '@/components/LoginForm';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { Button} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import { useRouter } from 'expo-router';

const router = useRouter();

//the login pagge
export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/icon.png')}>
      </Image>
      
      <Text style={styles.butText} >Login</Text>

      {
        (session) ? 
        (
          <View>
            <View style={styles.border}>
              <Button style={styles.startBut}>
                <Pressable onPress={home}>
                  <Text style={styles.butText2} >Home Page</Text>
                </Pressable>
              </Button>
            </View>

            <View style={styles.border}>
            <Button style={styles.startBut}>
                <Pressable onPress={signOut}>
                  <Text style={styles.butText2} >Logout</Text>
                </Pressable>
              </Button>  
            </View> 
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

// a function the brings the user to the home page
function home()
{
  router.push('../(auth)/(tabs)/home');
}

//the login styles
const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  startBut:
  {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  butText:
  {
    fontSize: 64,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  butText2:
  {
    fontSize: 48,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: "white"
  },
  
  border:
  {
    borderWidth:  5,
    borderStyle: "solid",
    borderRadius: 12,
    borderColor: "black",
    marginVertical: 10,
  },

  image:
  {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 10,
    minHeight: 10,
    maxWidth: 300,
    maxHeight: 300,
  }
});
