import { Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup} from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';

export default function LoginForm()
{
    const [form, setForm] = useState(
    {
        email: "",
        password: ""
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
        axios.post('https://ca-1-js.vercel.app/api/workers/login', 
        {
            email: form.email,
            password: form.password
        })
        .then(response =>
        {
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