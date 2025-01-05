import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router/stack';

//controls what tabs appear
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="minerals/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="diamond" color={color} />,
        }}
      />

      <Tabs.Screen
        name="mines/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="industry" color={color} />,
        }}
      />

      <Tabs.Screen
        name="workers/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="male" color={color} />,
        }}
      />

      <Tabs.Screen
        name="companies/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="eur" color={color} />,
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
        name="minerals/create"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mines/create"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="companies/create"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="work_hours/create"
        options={{
          href: null
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

      <Tabs.Screen
        name="work_hours/[id]/edit"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="work_hours/[id]/delete"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="minerals/[id]/edit"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="minerals/[id]/delete"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mines/[id]/edit"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mines/[id]/delete"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="companies/[id]/edit"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="companies/[id]/delete"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mineral_mines/[id]/delete"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mineral_mines/[id]/edit"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mineral_mines/[id]/index"
        options={{
          href: null
         }}
      />

      <Tabs.Screen
        name="mineral_mines/create"
        options={{
          href: null
         }}
      />
    </Tabs>    
  );
}
