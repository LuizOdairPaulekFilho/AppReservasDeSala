import { StyleSheet, View } from "react-native";

export default function CardCarousel({ width, height, visible, onclick }) {
    if(visible) width = "90%"
    
  return (
    <View onTouchStart={onclick}
      style={[{ width, height, opacity: visible ? 1 : 0.5 }, styles.card]}
    ></View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#006DAA",
    margin: 10,
  },
});
