import { FlatList, Dimensions } from "react-native";
import CardCarousel from "./CardCaroseul";
import { useState } from "react";
import StatusReunionEnum from "../enums/StatusReunionEnum";

export default function Carousel({ vector, refreshControl, onDelete }) {
  const [selected, setSelected] = useState(0);

  const getStatus = (status) => {
    const statusMap = {
      cancelado: StatusReunionEnum.canceled,
      "em andamento": StatusReunionEnum.inProgress,
      pendente: StatusReunionEnum.pending,
      finalizada: StatusReunionEnum.finished,
    };
    return statusMap[status] || StatusReunionEnum.pending;
  };

  const ITEM_HEIGHT = 220;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const CENTER_OFFSET = (SCREEN_HEIGHT - ITEM_HEIGHT) / 2;

  return (
    <FlatList
      data={vector}
      keyExtractor={(_, i) => i.toString()}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={ITEM_HEIGHT}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      renderItem={({ item, index }) => {
        const isVisible = index === selected;

        return (
          <CardCarousel
            width={320}
            height={200}
            visible={isVisible}
            setor={item.Setor.nome.toUpperCase()}
            data={item.data_reuniao}
            status={getStatus(item.status_reuniao)}
            id={item.id}
            onPress={() => setSelected(index)}
            onDelete={() => onDelete(item.id)} 
          />
        );
      }}
      contentContainerStyle={{
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: CENTER_OFFSET,
      }}
      refreshControl={refreshControl}
    />
  );
}
