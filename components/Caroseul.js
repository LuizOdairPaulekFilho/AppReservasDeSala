import { PanResponder, StyleSheet, View } from "react-native";
import CardCarousel from "./CardCaroseul";
import { useRef, useState } from "react";

export default function Carousel({ vector }) {
  const [keySelected, setKeySelected] = useState(0);
  const startDy = useRef(0);
  const threshold = 50; 

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        startDy.current = gestureState.dy; // guarda posição inicial
      },
      onPanResponderMove: (e, gestureState) => {
        const diff = gestureState.dy - startDy.current;
        if (diff > threshold) {
          setKeySelected((prev) => Math.max(prev - 1, 0)); 
          startDy.current = gestureState.dy; 
        } else if (diff < -threshold) {
          setKeySelected((prev) => Math.min(prev + 1, vector.length - 1));
          startDy.current = gestureState.dy; 
        }
      },
      onPanResponderRelease: () => {
        startDy.current = 0; 
      },
    })
  ).current;

  return (
    <View style={styles.carousel} {...panResponder.panHandlers}>
      {vector.map((element, index) => {
        const diff = Math.abs(index - keySelected);
        const visible = keySelected === index;
        const width = `${90 - diff * 10}%`;
        const height = `${55 - diff * 10}%`;

        return (
          <CardCarousel
            key={index}
            width={width}
            height={height}
            visible={visible}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    width: "100%",
    height: "40%",
    display: "flex",
    alignItems: "center",
  },
});
