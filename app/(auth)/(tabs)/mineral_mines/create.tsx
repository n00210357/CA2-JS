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
        mineral_id: "",
        mine_id: "",
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

        postRequest('https://ca-1-js.vercel.app/api/mineral_mines', form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/home`);
        });
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <View>
            <Text style={styles.bigText}>Mineral id</Text>
            <TextInput
                style={styles.input}
                placeholder='Mineral id'
                value={form.mineral_id}
                onChange={handleChange}
                id='mineral_id'
            />

            <Text style={styles.bigText}>Mine id</Text>
            <TextInput
                style={styles.input}
                placeholder='Mine id'
                value={form.mine_id}
                onChange={handleChange}
                id='mine_id'
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