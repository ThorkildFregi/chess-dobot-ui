import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    const ref = useRef<ChessboardRef>(null);
    const response = fetch("http://192.168.0.107:8081/").then(response => {console.log(response)});

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={styles.gesturehandler}>
                <Chessboard 
                    ref={ref}
                    withLetters={true}
                    withNumbers={true}
                    onMove={({ state }) => {
                        console.log(state.fen);
                        console.log(response);
                    }}
                />
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gesturehandler: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});