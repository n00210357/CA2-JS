import { Text, TextInput, StyleSheet, Button} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';

export default function RegistorForm()
{
    const [form, setForm] = useState(
    {
        full_name: "",
        description: "",
        email: "",
        password: "",
        phone: "",
        //image_path: string;
    })

    const [error, setError] = useState("");
    const { signIn } = useSession();

    const handleChange = (e: any) =>
    {
        setForm(prevState => 
        ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () =>
    {
        axios.post('https://ca-1-js.vercel.app/api/workers/register', 
        {
            full_name: form.full_name,
            description: form.description,
            email: form.email,
            password: form.password,
            phone: form.phone,
        })
        .then(response =>
        {
            console.log(response.data.token)
            signIn(response.data.token);
        })
        .catch(e =>
        {
            setError(e.response.data.message);
        })
    }

    return(
        <>
        <TextInput
                style={styles.input}
                placeholder='Full_name'
                value={form.full_name}
                onChange={handleChange}
                id='full_name'
            />

            <TextInput
                style={styles.input}
                placeholder='Description'
                value={form.description}
                onChange={handleChange}
                id='description'
            />

            <TextInput
                style={styles.input}
                placeholder='Email'
                value={form.email}
                onChange={handleChange}
                id='email'
            />

            <TextInput
                style={styles.input}
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                id='password'
            />

            <TextInput
                style={styles.input}
                placeholder='Phone'
                value={form.phone}
                onChange={handleChange}
                id='phone'
            />

            <Text>{error}</Text>

            <Button
                onPress={handlePress}
                title="Submit"
                color="red"
            />
        </>
    )
}

const styles = StyleSheet.create(
{
    input:
    {
        height: 40,
        margin: 10,
        borderWidth: 1,
    }
});