import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false}} />
        <Stack.Screen name="play" options={{ title: 'Play', headerShown: false }} />
    </Stack>
  );
}