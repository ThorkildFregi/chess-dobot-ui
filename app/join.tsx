import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const raspip = getValueFor("raspip");

    function isStringNumber(value: string): boolean {
        return !isNaN(Number(value)) && value.trim() !== '';
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Code (doit contenir 4 chiffres)" 
                maxLength={4}
                onChangeText={text => setCode(text)}
            />
            <View style={styles.centerContainer}>
                <Button 
                    title="Créer la partie" 
                    color="#D90B1C"
                    onPress={() => {
                        if (isStringNumber(code)) {
                            if (Number(code) >= 1000) {
                                const request = new XMLHttpRequest();
                                    request.onreadystatechange = e => {
                                    if (request.readyState !== 4) {
                                        return;
                                    }

                                    if (request.status == 202) {
                                        router.navigate(`/play?code=${code}&fen=${request.responseText}`);
                                    }
                                    else if (request.status == 403) { 
                                        setError("Le code est erroné");
                                    }
                                    else if (request.status == 400) {
                                        setError("Aucune partie en cours");
                                    }
                                    else {
                                        console.warn('error');
                                    }
                                };
                                request.open("get", `http://${raspip}:8081/join?code=${code}`);
                                request.send();
                            }
                            else {
                                setError("Le code ne contient pas 4 chiffres");
                            }
                        }
                        else {
                            setError("Le code n'a pas que des chiffres");
                        }
                    }} 
                />
                <Text style={styles.text}>{ error }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#262626',
        justifyContent: "center",
    },
    centerContainer: {
        alignItems: "center",
    },
    text: {
        fontWeight: 900,
        fontSize: 12,
        color: '#D90B1C',
        margin:16,
        textAlign: 'center',
        borderRadius: 10,
        padding: 8,
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
});