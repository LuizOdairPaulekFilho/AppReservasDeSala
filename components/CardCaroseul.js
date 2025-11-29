import { StyleSheet, Text, View } from "react-native";

export default function CardCarousel({ width, height, visible, setor, status, data }) {

  return (
    <View
      style={[
        { width, height, opacity: visible ? 1 : 0.5 },
        styles.card
      ]}
    >
      <Text style={styles.label}>SETOR: {setor}</Text>
      <Text style={styles.label}>STATUS: {status}</Text>
      <Text style={styles.label}>DATA: {data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#006DAA",
    margin: 10,
    padding: 15,
    overflow: "hidden",
  },

  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
  },
});
