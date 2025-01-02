import RegistorForm from '@/components/RegistorForm';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() 
{
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
