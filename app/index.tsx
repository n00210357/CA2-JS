import { View, Text, StyleSheet, Image } from 'react-native'; //Button
import { Link } from 'expo-router';
import { Button } from "@/components/ui/button"
export default function Tab() 
{
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/icon.png')}>
      </Image>

      <Text style={styles.butText} >Miner Guide</Text>

          <Link href={{pathname: '/login',}} style={styles.border}>
            <Button style={styles.startBut}>
              <Text style={styles.butText2}>  Login   </Text>
            </Button>
          </Link>
        
          <Link href={{pathname: '/registor',}} style={styles.border}>
            <Button style={styles.startBut} variant="solid" action="secondary">
              <Text style={styles.butText}>Registor</Text>
            </Button>
          </Link>
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

  startBut:
  {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 60,
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
    fontSize: 64,
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
