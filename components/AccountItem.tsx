import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { WorkerType } from '@/types';

interface MyProps {
    account: WorkerType;
}

export default function MineItem({account}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/mines/[id]',
                params: { id: account._id }
            }}><Text>{account.full_name}</Text></Link>
            <Text>{account.description}</Text>
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