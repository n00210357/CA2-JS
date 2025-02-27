import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Pressable } from '@/components/ui/pressable';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    const [form, setForm] = useState({
        name: "",
        description: "",
        ceo_email: ""
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

        postRequest('https://ca-1-js.vercel.app/api/companies', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/companies`);
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
            
            <Text style={styles.bigText}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={form.description}
                onChange={handleChange}
                id='description'
            />

            <Text style={styles.bigText}>Ceo email</Text>
            <TextInput
                style={styles.input}
                placeholder='Ceo email'
                value={form.ceo_email}
                onChange={handleChange}
                id='ceo_email'
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