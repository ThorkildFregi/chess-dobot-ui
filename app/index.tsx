import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

function save(key: string, value: string) {
    SecureStore.setItem(key, value);
}

function getValueFor(key: string) {
    const result = SecureStore.getItem(key);
    if (result) {
        return result
    } else {
        return "novalue"
    }
}

export default function Index() {
    const router = useRouter();

    const [ip, setIP] = useState<string>("");
    const [isVisible, setVisibility] = useState<boolean>(false);

    const raspip = getValueFor("raspip");

    useEffect(() => {
        if (raspip == "novalue") {
            setVisibility(true);
        }
    }, []);

    return (
        <View style={styles.baseContainer}>
            <View style={styles.container}>
                <Text style={styles.text}>Créer une nouvelle partie</Text>
                <Button title="Nouvelle partie" onPress={() => router.navigate('/createaparty')} color="#D90B1C" />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Rejoins la partie</Text>
                <Button title="Rejoindre" onPress={() => router.navigate('/join')} color="#D90B1C" />
            </View>
            <View style={styles.centerContainer}>
                <Button title="Changer IP" onPress={() => setVisibility(true)} color="#D90B1C" />
            </View>
            <Modal animationType='slide' transparent={true} visible={isVisible}>
                <View style={styles.modalContent}>
                        <Text style={styles.text}>Ecrit l'ip du site {"\n"} C'est la même que pour accéder à la page d'installation !</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="192.168.???.???"
                            maxLength={15}
                            onChangeText={text => setIP(text)}
                        />
                        <View style={styles.centerContainer}>
                            <Button 
                                title="Envoyer" 
                                color="#D90B1C" 
                                onPress={() => {
                                    save("raspip", ip);
                                    setVisibility(false);
                            }} 
                            />
                        </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: '#262626',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: "center",
    },
    text: {
        fontWeight: 900,
        fontSize: 30,
        color: '#401619',
        backgroundColor: "#BF3B53",
        borderWidth: 4,
        borderColor: '#731A2B',
        margin:16,
        textAlign: 'center',
        borderRadius: 10,
        padding: 8,
    },
    modalContent: {
        height: '100%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
        justifyContent: "center",
    },
    input: {
        fontWeight: 900,
        fontSize: 15,
        color: '#401619',
        backgroundColor: "#BF3B53",
        borderWidth: 4,
        borderColor: '#731A2B',
        marginBottom:16,
        borderRadius: 10,
        padding: 8,
    },
    centerContainer: {
        alignItems: "center",
        marginBottom: "11%",
    },
});