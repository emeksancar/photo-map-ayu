import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="camera"
        options={{
          title: "Kamera",
          tabBarIcon: ({ color }) => (
            <Entypo name="camera" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Harita",
          tabBarIcon: ({ color }) => (
            <Entypo name="location-pin" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map2"
        options={{
          title: "Harita2",
          tabBarIcon: ({ color }) => (
            <Entypo name="location-pin" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
