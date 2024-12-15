import { Text, TextInput, StyleSheet} from 'react-native';
import { useState } from 'react';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';

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
        setForm(prevState => (
        {
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
            autoLogin(response)
        })
        .catch(e =>
        {
            setError(e.response.data.message.message);
        })
    }

    async function autoLogin(resp: any)
    {
        axios.post('https://ca-1-js.vercel.app/api/workers/login', 
        {
            email: form.email,
            password: form.password
        })

        signIn(resp.data.token);
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

            <Button>
            <Pressable onPress={handlePress}>
                <Text>Submit</Text>
            </Pressable>
            </Button>

            <Link href={{pathname: '..',}}>
                <Button size="md" variant="solid" action="primary">
                  <ButtonText>back</ButtonText>
                </Button>
            </Link>
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