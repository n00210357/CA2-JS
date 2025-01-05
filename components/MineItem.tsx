import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { MineType } from '@/types';
import { EyeIcon } from './ui/icon/index.web';
import { Icon } from './ui/icon';

interface MyProps {
    mine: MineType;
}

//the mine item
export default function MineItem({mine}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={
            {
                pathname: '/mines/[id]',
                params: { id: mine._id }
            }}>

            <View style={styles.bigBox}>
                <View style={styles.img}>
                    <Image source={require('../assets/images/icon.png')} style={{width: 100, height: 100}} />  
                </View>

                <View>
                    <Text style={styles.headed}>{mine.name}</Text>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Managed</Text>
                        <Text style={styles.standard}>{mine.manager_email}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Owned by</Text>
                        <Text style={styles.standard}>{mine.company_name}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Latitude</Text>
                        <Text style={styles.standard}>{mine.latitude}</Text>
                    </View>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>Longitude</Text>
                        <Text style={styles.standard}>{mine.longitude}</Text>
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