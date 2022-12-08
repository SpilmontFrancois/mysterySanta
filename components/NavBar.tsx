import { Text, View } from "react-native";
import { StyleSheet } from 'react-native';
import { Button } from "react-native-elements";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.NavBar}>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    height: 50,
    width: '100%',
  },
});

export default NavBar