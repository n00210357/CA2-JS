import { View, Text, TextInput, StyleSheet} from 'react-native';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { Link } from 'expo-router';

//the registor form
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
        <View style={styles.container}>
            <Text style={styles.bigText} >Full name</Text>
            <TextInput
                style={styles.input}
                placeholder='Full_name'
                value={form.full_name}
                onChange={handleChange}
                id='full_name'
            />
            <Text style={styles.smallText} >should be your full name</Text>

            <Text style={styles.bigText} >Description</Text>
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={form.description}
                onChange={handleChange}
                id='description'
            />
            <Text style={styles.smallText} >Age, skill set, etc</Text>

            <Text style={styles.bigText} >Email</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={form.email}
                onChange={handleChange}
                id='email'
            />
            <Text style={styles.smallText} >An email can only be used once</Text>

            <Text style={styles.bigText} >Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                id='password'
            />
            <Text style={styles.smallText} >Should be 6 or more characters</Text>

            <Text style={styles.bigText} >Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder='Phone'
                value={form.phone}
                onChange={handleChange}
                id='phone'
            />
            <Text style={styles.smallText} >Optional</Text>

            <Text>{error}</Text>

            <View style={styles.border}>
                <Button style={styles.startBut}>
                    <Pressable onPress={handlePress}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                </Button>
            </View>

            <Link href={{pathname: '..',}} style={styles.border}>
                <Button style={styles.startBut} variant="solid" action="primary">
                  <Text style={styles.text}>  back  </Text>
                </Button>
            </Link>
        </View>
    )
}

//the styles
const styles = StyleSheet.create(
{
    container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input:
    {
        height: 40,
        borderWidth: 1,
    },

    smallText:
    {
        fontSize: 10,
        fontWeight: 300, 
        marginBottom: 10
    },

    bigText:
    {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold", 
    },

    startBut:
    {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    text:
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
    },
});