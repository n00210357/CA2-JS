import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router/stack';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="minerals/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="mines/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="workers/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="companies/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="account/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="mines/[id]/index"
        options={{
          href: null
         }}
      />

    <Tabs.Screen
        name="minerals/[id]/index"
        options={{
          href: null
         }}
      />

    <Tabs.Screen
        name="companies/[id]/index"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="workers/[id]/index"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="work_hours/[id]/index"
        options={{
          href: null
         }}
      />
    </Tabs>
  );
}
