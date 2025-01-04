import RegistorForm from '@/components/RegistorForm';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Tab() 
{
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/icon.png')}>
      </Image>

      <Text style={styles.Text}>Register</Text>
      
      <RegistorForm/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Text:
  {
    fontSize: 64,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  image:
  {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 10,
    minHeight: 10,
    maxWidth: 200,
    maxHeight: 200,
  }
});
