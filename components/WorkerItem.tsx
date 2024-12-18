import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { WorkerType } from '@/types';
import { EyeIcon } from './ui/icon/index.web';
import { Icon } from './ui/icon';

interface MyProps {
    worker: WorkerType;
}

export default function WorkerItem({worker}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={
            {
                pathname: '/workers/[id]',
                params: { id: worker._id }
            }}>

            <View style={styles.bigBox}>
                <View style={styles.img}>
                    <Image source={require('../assets/images/icon.png')} style={{width: 100, height: 100}} />  
                </View>

                <View>
                    <Text style={styles.headed}>{worker.full_name}</Text>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Email</Text>
                        <Text style={styles.standard}>{worker.email}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Phone</Text>
                        <Text style={styles.standard}>{worker.phone}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>About the worker</Text>
                        <Text style={styles.standard}>{worker.description}</Text>
                    </View>
                </View>
            </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
    },

    headed:
    {
        fontSize: 14,
        maxWidth: 200,
        marginVertical: 0,
        fontWeight: 'bold',
    },

    standard:
    {
        fontSize: 12,
        marginVertical: 5,
        maxWidth: 200,
        flex: 0,
        flexWrap: 'wrap'
    },

    bigBox:
    {
        flex:1,
        flexDirection:'row',
    },

    smallBox:
    {
        flex:1,
    },

    img:
    {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
});