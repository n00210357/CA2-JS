import { Image, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { WorkerType } from '@/types';
import { useSession } from '@/contexts/AuthContext';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Tab() {
  const [workers, setWorker] = useState<WorkerType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession();

  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/workers/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
         .then(response => {
            console.log(response.data);
            setWorker(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!workers) return <Text>Worker not found</Text>

  let img

  if (workers.image_path != undefined && workers.image_path != '' && workers.image_path != 'http://api-image.s3.eu-west-1.amazonaws.com/undefined')
  {
    img = {uri: workers?.image_path}
  }
  else
  {
    img = require('../../../../../assets/images/icon.png')
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <Image style={styles.image} source={img}>
      </Image>

      <Text style={styles.text}>{workers.full_name}</Text>
      <Text style={styles.bigText}>{workers.email}</Text>
      <Text style={styles.smallText}>{workers.description}</Text>
      <Text style={styles.bigText}>Phone number</Text>
      <Text style={styles.smallText}>{workers.phone}</Text>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sides: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bigText:
  {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold", 
    paddingVertical: 10
  },

  smallText:
  {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },

  input: 
  {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10
  },

  startBut:
  {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 60,
  },

  text:
  {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  butText2:
  {
    fontSize: 32,
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
    marginHorizontal: 10,
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
