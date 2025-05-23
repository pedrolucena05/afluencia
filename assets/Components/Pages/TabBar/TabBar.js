import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home";

const Tab = createBottomTabNavigator()

const TabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
            />
        </Tab.Navigator>

    )
}

export default TabBar