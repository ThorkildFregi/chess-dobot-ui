import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    const ref = useRef<ChessboardRef>(null);
    const code = 0;
    
    const [pendingMove, setPendingMove] = useState<{ from: string; to: string } | null>(null);

    useEffect(() => {
        if (pendingMove && ref.current) {
            ref.current.move({ from: pendingMove.from, to: pendingMove.to });
            setPendingMove(null);
        }
    }, [pendingMove]);

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={styles.gesturehandler}>
                <Chessboard 
                    ref={ref}
                    withLetters={true}
                    withNumbers={true}
                    gestureEnabled={true}
                    onMove={({ state }) => {
                        const fen = state.fen;
                        const split = fen.split(" ");
                        if (split[1] == "b") {
                            const request = new XMLHttpRequest();
                                request.onreadystatechange = e => {
                                if (request.readyState !== 4) {
                                    return;
                                }

                                if (request.status === 202) {
                                    const move = request.responseText;

                                    const from = move.substring(0, 2);
                                    const to = move.substring(2, move.length);
                                    setPendingMove({ from, to });

                                    console.log('success', request.responseText);
                                } else {
                                    console.warn('error');
                                }
                            };

                            request.open("get", `http://192.168.0.107:8081/makeamove?code=${code}&fen=${fen}`);
                            request.send()                          
                        }
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