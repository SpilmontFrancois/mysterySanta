import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSession } from "../utils/auth/SessionContext";
import { getParticipation } from "../utils/participation";
import { TParticipations } from "../types/participation";
import Loader from "./ui/Loader";

const HistoryPage = () => {

  const [participations, setParticipations] = React.useState<TParticipations[] | undefined>(undefined);

  const session = useSession();

  React.useEffect(() => {
    if (session) {
      getParticipation(session.user.id).then((participations) => {
        setParticipations(participations);
      });
    }
  }
    , [session]);

  if (!participations) {
    return <Loader />;
  }

  return (
    <View>
      <ImageBackground
        source={require("../assets/img/tree.png")}
        style={styles.background}
      >
        <ScrollView style={styles.paddingBottom}>
          <Text style={styles.titleHistory}>Vos participations :</Text>
          {participations.map((participation) => (
            <View>
              <Text style={styles.title}>Votre Secret Santa de</Text>
              <Text style={styles.description}>Vous participez actuellement au Secret Santa du mois de Décembre. N'oubliez pas de commander le cadeau de #### avant le <Text style={styles.bold}>15 Décembre</Text>.</Text>
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
