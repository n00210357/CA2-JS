import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Work_hourType } from '@/types';
import { EyeIcon } from './ui/icon/index.web';
import { Icon } from './ui/icon';

interface MyProps {
    work_hour: Work_hourType;
}

//the work hour item
export default function Work_hourItem({work_hour}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={
            {
                pathname: '/(auth)/(tabs)/work_hours/[id]',
                params: { id: work_hour._id }
            }}>

            <View style={styles.bigBox}>
                <View style={styles.img}>
                    <Image source={require('../assets/images/icon.png')} style={{width: 100, height: 100}} />  
                </View>

                <View>
                    <Text style={styles.headed}>{work_hour.worker_email}</Text>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>At</Text>
                        <Text style={styles.standard}>{work_hour.mine_id}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Start</Text>
                        <Text style={styles.standard}>{work_hour.start}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>End</Text>
                        <Text style={styles.standard}>{work_hour.end}</Text>
                    </View>
                </View>
            </View>
            </Link>
        </View>
    );
}

//the styles
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
        fontWeight: 'bold'
    },

    standard:
    {
        fontSize: 12,
        maxWidth: 200,
        marginVertical: 5,
    },

    bigBox:
    {
        flex:1,
        flexDirection:'row'
    },

    smallBox:
    {
        flex:1
    },

    img:
    {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
});