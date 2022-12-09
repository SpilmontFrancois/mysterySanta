import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {COLORS} from '../utils/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {customRoutes} from '../settings/routes';

type Props = {};

const TabBar = (props: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {props.state.routes.map((route, index) => {
          const customRoute =
            customRoutes[route.name as keyof typeof customRoutes];
          const isFocused = props.state.index === index;
          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };
          if (customRoute && customRoute.tab && customRoute.icon) {
            return (
              <TouchableOpacity style={styles.tabButton} onPress={onPress}>
                <FontAwesomeIcon
                  icon={customRoute.icon}
                  size={24}
                  color={isFocused ? COLORS.neutral['100'] : '#92ABBE'}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      color: isFocused ? COLORS.neutral['100'] : '#92ABBE',
                    },
                  ]}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral['100'],
    height: 80,
  },
  innerContainer: {
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: COLORS.secondary,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    marginTop: 6,
  },
  tabButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBar;
