import { ScrollView, View } from "react-native";
import NavBar from "./NavBar";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <ScrollView>
      <Tab.Navigator tabBar={props => <NavBar {...props} />}>
      </Tab.Navigator>
    </ScrollView>
  );
}

export default HomePage