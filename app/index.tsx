import { Button, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import {Image, StyleSheet, Text, View} from 'react-native';
import { useEffect } from "react";

export default function Index() {

  const router = useRouter();
  const step: number = 1;
  const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  return (
    <View
      style={styles.container}
    >
      <Image style={styles.image} source={require('../assets/images/Vector.png')} />
      <Text style={styles.title}>Welcome to ChatGPT</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>
            
      <Text style={styles.subtitle}>Example</Text>

      <Image style={styles.image} source={require('../assets/images/Frame.png')} />
      
      <View style={styles.border}>
        <Text style={styles.subtitle}>"Explain quantum computing in simple terms"</Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>"Got any creative ideas for a 10 year old's birthday"</Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>"How do i make an HTTP request in JavaScript?"</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressLine, step === 1 && styles.active]} />
        <View style={[styles.progressLine, step === 2 && styles.active]} />
        <View style={[styles.progressLine, step === 3 && styles.active]} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.navigate("/capabilities")}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#343541',
    flex: 1,
    alignItems: 'center',
  },
  title:{
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subtitle:{
    color:'white',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingEnd:10,
    paddingStart:10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#10A37F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image:{
    paddingTop: 10,
  },
  border:{
    borderWidth: 1,
    borderColor: 'dimgray',
    borderRadius: 8,
    backgroundColor: 'dimgray',
    margin: 10,
    width: "90%",

  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  progressLine: {
    width: 30, 
    height: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#10A37F", // Verde en la página activa
  },
})
