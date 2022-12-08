import React from "react";
import { ImageBackground, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/globalStyle";

const HistoryPage = () => {

  const [participations, setParticipations] = React.useState([
    {
      year: 2022,
      receiver: "John Doe",
      active: true,
    },
    {
      year: 2021,
      receiver: "Jane Doe",
      active: false,
    },
    {
      year: 2020,
      receiver: "Bertrand Doe",
      active: false,
    },
    {
      year: 2019,
      receiver: "Hervé Renard",
      active: false,
    },
    {
      year: 2018,
      receiver: "Jean-Pierre Papin",
      active: false,
    },
    {
      year: 2017,
      receiver: "Didier Deschamps",
      active: false,
    },
    {
      year: 2016,
      receiver: "Zinedine Zidane",
      active: false,
    },
  ]);

  return (
    <View>
      <ImageBackground
        source={require("../assets/img/tree.png")}
        style={styles.background}
      >
        <ScrollView style={styles.paddingBottom}>
          <Text style={styles.titleHistory}>Vos participations :</Text>
          {participations.map((participation) => (
            <View style={[styles.items, participation.active === false ? styles.notActive : styles.active]} key={participation.year}>
              <Text style={styles.title}>Votre Secret Santa de {participation.year}</Text>
              {
                participation.active ? (
                  <Text style={styles.description}>Vous participez actuellement au Secret Santa du mois de Décembre {participation.year}. N'oubliez pas de commander le cadeau de <Text style={styles.bold}>{participation.receiver}</Text> avant le <Text style={styles.bold}>15 Décembre</Text>.</Text>
                ) : (
                  <Text style={styles.description}>Vous avez participé au Secret Santa du mois de Décembre {participation.year}. Vous avez offert un cadeau à {participation.receiver}.</Text>
                )
              }
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#BC4633',
    borderRadius: 10,
    backgroundColor: '#EE9334',
  },
  title: {
    fontWeight: '500',
    fontSize: 19,
    textAlign: 'center',
    color: '#4F2F0D',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#4F2F0D',
  },
  titleHistory: {
    //light bold
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#4F2F0D',
    fontFamily: 'lucida grande',
  },
  paddingBottom: {
  },
  active: {
  },
  notActive: {
    opacity: 0.85,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    alignSelf: 'center',
    zIndex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
}
);

export default HistoryPage
