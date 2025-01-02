import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { CompanyType } from '@/types';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
    const [company, setCompany] = useState<CompanyType | null>(null);
    const { id } = useLocalSearchParams();
    
    useEffect(() => 
    { 
        axios.get(`https://ca-1-js.vercel.app/api/companies/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
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

    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        description: "",
        ceo_email: "",
        image_path: "",
    });

    const { putRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {

        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);

        if (company != null)
        {
            if (form.name == null || form.name == '')
            {
                form.name = company.name
            }
    
            if (form.description == null || form.description == '')
            {
                form.description = company.description
            }

            if (form.ceo_email == null || form.ceo_email == '')
            {
                form.ceo_email = company.ceo_email
            }
    
            if ((company.image_path != null || company.image_path == '') && (form.image_path == null || form.image_path == ''))
            {
                form.image_path = company.image_path
            }
        }

        putRequest(`https://ca-1-js.vercel.app/api/companies/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/companies/${id}`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    if(!company) return <Text>company not found</Text>

    return (
        <View>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={company.name}
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text>Description</Text>
            <TextInput
                style={styles.input}
                placeholder={company.description}
                value={form.description}
                onChange={handleChange}
                id='description'
            />

            <Text>Ceo email</Text>
            <TextInput
                style={styles.input}
                placeholder={company.ceo_email}
                value={form.ceo_email}
                onChange={handleChange}
                id='ceo_email'
            />

            <Text>Image path</Text>
            <TextInput
                style={styles.input}
                placeholder={company.image_path}
                value={form.image_path}
                onChange={handleChange}
                id='image_path'
            />

            <Text>{error}</Text>

            <Button 
                onPress={handleSubmit}
                title="Submit"
                color="#841584"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});