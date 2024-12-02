import { Text, TextInput, StyleSheet, Button} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';

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
        console.log("ee");

        axios.post('https://festivals-api.vercel.app/api/users/login', 
        {
            email: form.email,
            password: form.password
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