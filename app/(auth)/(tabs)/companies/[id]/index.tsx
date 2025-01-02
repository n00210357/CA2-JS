import { View, Text, StyleSheet } from 'react-native';
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

        <Text>{company.name}</Text>
        <Text>{company.description}</Text>
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
