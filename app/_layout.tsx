import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#262626',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="play" options={{ headerShown: false }} />
        <Stack.Screen name="createaparty" options={{ title: "" }} />
        <Stack.Screen name="waiting" options={{ headerShown: false }} />
        <Stack.Screen name="join" options={{ title: "" }} />
        <Stack.Screen name="endparty" options={{ headerShown: false }} />
    </Stack>
  );
}