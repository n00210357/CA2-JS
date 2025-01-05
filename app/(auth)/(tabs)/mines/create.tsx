import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    
    const [form, setForm] = useState({
        name: "",
        latitude: "",
        longitude: "",
        manager_email: "",
        company_name: "",
    });

    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);

        postRequest('https://ca-1-js.vercel.app/api/mines', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/mines`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <View>
            <Text style={styles.bigText}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={form.name}
                onChange={handleChange}
                id='name'
            />

            <Text style={styles.bigText}>Latitude</Text>
            <TextInput
                style={styles.input}
                placeholder='Latitude'
                value={form.latitude}
                onChange={handleChange}
                id='latitude'
            />

            <Text style={styles.bigText}>Longitude</Text>
            <TextInput
                style={styles.input}
                placeholder='Longitude'
                value={form.longitude}
                onChange={handleChange}
                id='longitude'
            />

            <Text style={styles.bigText}>Managers email</Text>
            <TextInput
                style={styles.input}
                placeholder='Managers email'
                value={form.manager_email}
                onChange={handleChange}
                id='manager_email'
            />

            <Text style={styles.bigText}>Company</Text>
            <TextInput
                style={styles.input}
                placeholder='Company'
                value={form.company_name}
                onChange={handleChange}
                id='company_name'
            />

            <Text>{error}</Text>

            <View style={styles.container}>
                <View style={styles.border}>
                    <Button style={styles.startBut}>
                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.butText2} >    Create    </Text>
                        </Pressable>
                    </Button>
                </View>
            </View> 
        </View>
    );
}

//the mines styles
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