import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const FloatingActionButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Cadastrar reserva")}
        android_ripple={{ color: "white", borderless: true }}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    position: "absolute",
    bottom: 70, 
    right: 20, 
  
    zIndex: 10,
  },
  button: {
    backgroundColor: "#0353A4", 
    width: 80, 
    height: 80,
    borderRadius: 40,
    justifyContent: "center", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    lineHeight: 30, 
  },
});

export default FloatingActionButton;
