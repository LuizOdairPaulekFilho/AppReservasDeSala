import { RefreshControl } from "react-native";
import Header from "../components/Header";
import Carousel from "../components/Caroseul";
import FloatingActionButton from "../components/FloatingActionButton";
import { useEffect, useState } from "react";
import { apiGet } from "../utils/apiRequests";
import { SafeAreaView } from "react-native-safe-area-context";

const Reunioes = () => {
  const [reunioes, setReunioes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReunioes = async () => {
    const dados = await apiGet("/api/reunioes/user");
    
    const pendentes = dados.filter((r) => r.status_reuniao === "pendente");
    setReunioes(pendentes);
  };

  useEffect(() => {
    fetchReunioes();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReunioes();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    setReunioes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Minhas Reunioes"} />
      <Carousel
        vector={reunioes}
        onDelete={handleDelete}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FloatingActionButton />
    </SafeAreaView>
  );
};

export default Reunioes;
