import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
    const router = useRouter();

    const {fileplace} = useLocalSearchParams();

    var eme = "";

    if (fileplace == "1") {
        eme = "er"
    }
    else {
        eme = "ème"
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tu es {fileplace} {eme} dans la file d'attente. Soit prêt à jouer quand ce sera ton tour ! Va sur le lien d'installation et en bas de la page pour voir la version actualisée de la liste !</Text>
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