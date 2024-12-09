import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MineType } from '@/types';

interface MyProps {
    mine: MineType;
}

export default function MineItem({mine}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/mines/[id]',
                params: { id: mine._id }
            }}><Text>{mine.name}</Text></Link>
            <Text>{mine.manager_email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
      }
});