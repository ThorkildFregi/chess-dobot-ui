import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Chessboard, { ChessboardRef } from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function getValueFor(key: string) {
    const result = SecureStore.getItem(key);
    if (result) {
        return result
    } else {
        return "novalue"
    }
}

export default function Play() {
    const ref = useRef<ChessboardRef>(null);
    const router = useRouter();

    const {code, fen} = useLocalSearchParams();

    const [arrival, setArrival] = useState<boolean>(true);
    const [pendingMove, setPendingMove] = useState<{ from: string; to: string } | null>(null);

    const raspip = getValueFor("raspip");

    useEffect(() => {
        if (pendingMove && ref.current) {
            ref.current.move({ from: pendingMove.from, to: pendingMove.to });
            setPendingMove(null);
        }

        if (arrival == true && ref.current) {
            ref.current.resetBoard(fen);
            setArrival(false);
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
                        const team = split[1];
                        if (state.in_checkmate == true) {
                            fetch(`http://${raspip}:8081/resetparty`);
                            router.navigate(`/endparty?end=checkmate${team}`)
                        }
                        else if (state.in_draw == true) {
                            fetch(`http://${raspip}:8081/resetparty`);
                            router.navigate(`/endparty?end=draw`)
                        }
                        else if (state.in_stalemate == true) {
                            fetch(`http://${raspip}:8081/resetparty`);
                            router.navigate(`/endparty?end=stalemate${team}`)
                        }
                        else {    
                            if (team == "b") {
                                const request = new XMLHttpRequest();
                                    request.onreadystatechange = e => {
                                    if (request.readyState !== 4) {
                                        return;
                                    }

                                    if (request.status == 202) {
                                        const move = request.responseText;

                                        const from = move.substring(0, 2);
                                        const to = move.substring(2, move.length);
                                        setPendingMove({ from, to });
                                    } 
                                    else if (request.status == 408) {
                                        router.navigate(`/endparty?end=timesup`)
                                    }
                                    else {
                                        console.warn('error');
                                    }
                                };
                                request.open("get", `http://${raspip}:8081/makeamove?code=${code}&fen=${fen}`);
                                request.send()                          
                            }
                        }
                    }}
                />
                <Button 
                    title="Cancel Game" 
                    color="#D90B1C"
                    onPress={() => {
                        fetch(`http://${raspip}:8081/resetparty`);
                        router.navigate('/');
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