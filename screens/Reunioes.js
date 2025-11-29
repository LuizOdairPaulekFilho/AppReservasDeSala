import { Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../components/Caroseul";
import FloatingActionButton from "../components/FloatingActionButton";
import { useEffect, useState } from "react";
import { apiGet } from "../utils/apiRequests";
const Reunioes = () => {
  const [reunioes, setReunioes] = useState([]);

  useEffect(() => {
    const getAllReunions = async () => {
      const dados = await apiGet("/api/reunioes");
      setReunioes(dados);
    };
    getAllReunions();
  }, []);

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <View>
        <Header title={"Minhas Reunioes"}></Header>
      </View>
      <Carousel vector={reunioes}></Carousel>
      <FloatingActionButton></FloatingActionButton>
    </SafeAreaView>
  );
};

export default Reunioes;
