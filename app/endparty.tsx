import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const router = useRouter();

    const {end} = useLocalSearchParams();

    var message_primary = "";
    var message_secondary = "";

    if (end == "checkmatew") {
        message_primary = "Défaite";
        message_secondary = "Peut-être la prochaine fois ;)";
    }
    else if (end == "checkmateb") {
        message_primary = "Victoire";
        message_secondary = "Trop fort !";
    }
    else if (end == "draw") {
        message_primary = "Nulle";
        message_secondary = "Dommage...";
    }
    else if (end == "stalematew") {
        message_primary = "Pat";
        message_secondary = "Pas mal, pas mal...";
    }
    else if (end == "stalemateb") {
        message_primary = "Pat";
        message_secondary = "Dommage à vraiment rien !";
    }
    else if (end == "timesup") {
        message_primary = "Défaite";
        message_secondary = "Tu as manqué de temps";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message_primary} {"\n"} {message_secondary}</Text>
            <Button title="Retour à l'accueil" onPress={() => router.navigate('/')} color="#D90B1C" />
        </View>
    );
}

const styles = StyleSheet.create({
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
});