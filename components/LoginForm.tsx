import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
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
        <View>
            <Text style={styles.bigText} >Email</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={form.email}
                onChange={handleChange}
                id='email'
            />

            <Text style={styles.bigText} >Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                id='password'
            />

            <Text>{error}</Text>

            <View style={styles.border}>
                <Button style={styles.startBut}>
                    <Pressable onPress={handlePress}>
                        <Text style={styles.butText2} >Submit</Text>
                    </Pressable>
                </Button>
            </View>

            <Link href={{pathname: '..',}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                    <Text style={styles.butText2} >   back   </Text>
                </Button>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create(
{
    startBut:
    {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 60,
    },

    bigText:
    {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold", 
    },

    butText2:
    {
        fontSize: 64,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: "white"
    },

    input:
    {
        height: 40,
        margin: 10,
        borderWidth: 1,
    },

    border:
    {
        borderWidth:  5,
        borderStyle: "solid",
        borderRadius: 12,
        borderColor: "black",
        marginVertical: 10,
    },
});