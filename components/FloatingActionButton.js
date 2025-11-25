import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const FloatingActionButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Reservas")}
        android_ripple={{ color: "white", borderless: true }}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Position the container absolutely within its parent view
    position: "absolute",
    bottom: 70, // Adjust as needed for desired vertical position
    right: 20, // Adjust as needed for desired horizontal position
    // Ensure the button is above other content
    zIndex: 10,
  },
  button: {
    backgroundColor: "#0353A4", // Button color
    width: 80, // Circular shape requires equal width and height
    height: 80,
    borderRadius: 40, // Half of width/height to make it a perfect circle
    justifyContent: "center", // Center content (text or icon) vertically
    alignItems: "center", // Center content (text or icon) horizontally
    // Add shadow for depth (iOS specific)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    // Add elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    lineHeight: 30, // Helps with vertical centering of the '+' symbol
  },
});

export default FloatingActionButton;
