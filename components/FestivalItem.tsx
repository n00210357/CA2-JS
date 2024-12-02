import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FestivalType } from '@/types';

interface MyProps {
    festival: FestivalType;
}

export default function FestivalItem({festival}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/festivals/[id]',
                params: { id: festival._id }
            }}><Text>{festival.title}</Text></Link>
            <Text>{festival.city}</Text>
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