import { PanResponder, StyleSheet, View } from "react-native";
import CardCarousel from "./CardCaroseul";
import { useRef, useState } from "react";
import StatusReunionEnum from "../enums/StatusReunionEnum";

export default function Carousel({ vector }) {
  const [keySelected, setKeySelected] = useState(0);

  const threshold = 50;
  const swipeDone = useRef(false); // controla uma troca por gesto

  const getStatus = (status) => {
    const statusMap = {
      cancelado: StatusReunionEnum.canceled,
      "em andamento": StatusReunionEnum.inProgress,
      pendente: StatusReunionEnum.pending,
      finalizada: StatusReunionEnum.finished,
    };
    return statusMap[status] || StatusReunionEnum.pending;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 20;
      },

      onPanResponderGrant: () => {
        swipeDone.current = false; // libera swipe no início do gesto
      },

      onPanResponderMove: (_, gestureState) => {
        if (swipeDone.current) return; // já trocou neste gesto

        if (gestureState.dy > threshold) {
          swipe(-1); // sobe → item anterior
          swipeDone.current = true;
        } else if (gestureState.dy < -threshold) {
          swipe(1); // desce → próximo item
          swipeDone.current = true;
        }
      },

      onPanResponderRelease: () => {
        swipeDone.current = false; // libera próximo gesto
      },
    })
  ).current;

  const swipe = (direction) => {
    setKeySelected((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= vector.length) return prev;
      return next;
    });
  };

  return (
    <View style={styles.carousel} {...panResponder.panHandlers}>
      {vector.map((element, index) => {
        const diff = Math.abs(index - keySelected);
        const visible = index === keySelected;

        // Valores fixos para evitar bugs com %
        const width = 320 - diff * 40;
        const height = 220 - diff * 25;

        return (
          <CardCarousel
            key={index}
            width={width}
            height={height}
            visible={visible}
            setor={element.Setor.nome.toUpperCase()}
            data={element.data_reuniao}
            status={getStatus(element.status_reuniao)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    width: "100%",
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
});
