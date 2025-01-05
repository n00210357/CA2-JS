import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { MineralType } from '@/types';
import { EyeIcon } from './ui/icon/index.web';
import { Icon } from './ui/icon';

interface MyProps {
    mineral: MineralType;
}

//the mineral item
export default function MineralItem({mineral}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={
            {
                pathname: '/minerals/[id]',
                params: { id: mineral._id }
            }}>

            <View style={styles.bigBox}>
                <View style={styles.img}>
                    <Image source={require('../assets/images/icon.png')} style={{width: 100, height: 100}} />  
                </View>

                <View>
                    <Text style={styles.headed}>{mineral.name}</Text>

                    <View style={styles.smallBox}>
                        <Text style={styles.headed}>About the mineral</Text>
                        <Text style={styles.standard}>{mineral.description}</Text>
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