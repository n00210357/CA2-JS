import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { CompanyType } from '@/types';
import { Button, ButtonText } from "@/components/ui/button"
import { Link } from 'expo-router';

export default function Tab() {
  const [company, setCompany] = useState<CompanyType | null>(null);
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    
    axios.get(`https://ca-1-js.vercel.app/api/companies/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vQG1vLm1vIiwiZnVsbF9uYW1lIjoiTW8iLCJfaWQiOiI2NzI4ZjAzMWQ2YzdkYzAwMDhmNmY5ZjAiLCJpYXQiOjE3MzI2MTcwMTZ9.nUztWFux-E-PuU29Czr3WTEqA2PvlU0HYXPSngJ5920'
            }
        })
         .then(response => {
            console.log(response.data);
            setCompany(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!company) return <Text>Company not found</Text>
  
  return (
    <View style={styles.container}>
      <View>
        <Link href={
            {
                pathname: '/companies/[id]/edit',
                params: { id: company._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Edit</ButtonText>
          </Button>
        </Link>

        <Link href={
            {
                pathname: '/companies/[id]/delete',
                params: { id: company._id }
            }}>
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Delete</ButtonText>
          </Button>
        </Link>
      </View>

      <Image style={styles.image} source={{
          uri: company.image_path,
        }}>
      </Image>

      <Text style={styles.butText2}>{company.name}</Text>

      <Text>{company.description}</Text>

      <Text>{company.ceo_email}</Text>
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

  bigText:
  {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold", 
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

  butText2:
  {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
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