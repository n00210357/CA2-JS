import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Mineral_mineType, MineralType, MineType } from '@/types';
import { EyeIcon } from './ui/icon/index.web';
import { Icon } from './ui/icon';
import { useEffect, useState } from 'react';
import { useSession } from '@/contexts/AuthContext';
import axios from 'axios';

interface MyProps {
    mineral_mine: Mineral_mineType;
}

//the mineral mines
export default function Mineral_mineItem({mineral_mine}: MyProps){
    const [mineral_mined, setMineral_mine] = useState<MineralType | null>(null);
    const [minerals, setMinerals] = useState([]);
    const [mines, setMines] = useState([]);
    const { session } = useSession();
    let [miner] = useState();
    let [min] = useState();

    useEffect(() => {
        
        axios.get(`https://ca-1-js.vercel.app/api/mineral_mines/`, {
          headers: {
            Authorization: `Bearer ${session}`
        }
            })
             .then(response => {
                console.log(response.data);
                setMineral_mine(response.data);
             })
             .catch(e => {
                console.log(e);
             });
    
      }, []);

    useEffect(() => {    
        axios.get('https://ca-1-js.vercel.app/api/minerals')
        .then(response => {
          console.log(response.data);
          setMinerals(response.data);
        })
        .catch(e => {
          console.log(e);
        });  
      }, []);

    useEffect(() => {    
        axios.get('https://ca-1-js.vercel.app/api/mines')
        .then(response => {
            console.log(response.data);
            setMines(response.data);
        })
        .catch(e => {
            console.log(e);
        });  
        }, []);

    miner = undefined;
    min = undefined;

    if (mineral_mined != null && minerals != null)
    {
        minerals.forEach(minera => {
            
            if (mineral_mine.mineral_id == minera["_id"])
            {
                miner = minera
            }
        });
    }

    if (mineral_mined != null && mines != null)
    {
        mines.forEach(minera => {
            if (mineral_mine.mine_id == minera["_id"])
            {
                min = minera
            }
        });
    }

    if (miner == undefined) return (<Text>no mineral</Text>)

    if (min == undefined) return (<Text>no mine</Text>)

    return (
        <View style={styles.item}>
            <Link href={
            {
                pathname: '/(auth)/(tabs)/mineral_mines/[id]',
                params: { id: mineral_mine._id }
            }}>

            <View style={styles.bigBox}>
                <View>
                    <Text style={styles.headed}>{miner['name']}</Text>
                    <Text style={styles.standard}>mined at</Text>
                    <Text style={styles.headed}>{min['name']}</Text>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 20,
    },

    headed:
    {
        fontSize: 24,
        maxWidth: 200,
        marginVertical: 0,
        fontWeight: 'bold'
    },

    standard:
    {
        fontSize: 16,
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