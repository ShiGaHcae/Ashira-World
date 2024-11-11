import { View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.create}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="watch"
          options={{
            title: 'Watch',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.watch}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="feedback"
          options={{
            title: 'Feedback',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.feedback}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
