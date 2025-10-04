import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
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
    </>
  );
}