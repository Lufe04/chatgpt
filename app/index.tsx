import { Button } from "react-native";
import { useRouter } from "expo-router";
import {Image, StyleSheet, Text, View} from 'react-native';

export default function Index() {

  const router = useRouter();
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

    <View style={styles.button}>
      <Button title="Next" onPress={() => router.navigate("/welcome_1")}/>
    </View>

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
  button:{
    paddingTop:20,
    color:'#10A37F',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#10A37F',
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
    width:500,

  }
})
