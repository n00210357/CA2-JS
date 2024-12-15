import RegistorForm from '@/components/RegistorForm';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Link } from 'expo-router';

export default function Tab() 
{
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      
      <RegistorForm/>

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
