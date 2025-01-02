import { View, Text, StyleSheet, } from 'react-native'; //Button
import { Link } from 'expo-router';
import { Button, ButtonText} from "@/components/ui/button"
export default function Tab() 
{
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
