import React from "react";
import { ScrollView, Text, View } from "react-native";

const HistoryPage = () => {

  const [participations, setParticipations] = React.useState([]);

  React.useEffect(() => {
    setParticipations([]);
  }, []);

  return (
    <View>
      <Text>Votre historique des participations :</Text>
      <ScrollView>
        {participations.map((participation, index) => (
          <View style={styles.items}>
            <Text key={index} style={styles.title}>Secret Santa {participation}</Text>
            <Text style={styles.description}>Vous participez actuellement au Secret Santa du mois de décembre {participation}, n'oubliez pas de choisir votre cadeau avant le 15 décembre.</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = {
  items: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'brown',
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 15,
  },
}

export default HistoryPage
