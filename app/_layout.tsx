import { Stack } from 'expo-router/stack';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from '@/contexts/AuthContext';

export default function Layout() {
  return (
    <GluestackUIProvider mode="light"><SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider></GluestackUIProvider>
  );
}