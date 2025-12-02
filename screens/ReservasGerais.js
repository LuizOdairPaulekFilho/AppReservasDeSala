import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import CardReuniaoGeral from "../components/CardReuniaoGeral";
import StatusReunionEnum from "../enums/StatusReunionEnum";
import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import { apiGet } from "../utils/apiRequests";

const ReservasGerais = () => {
  const [reunioes, setReunioes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllReunions = async () => {
    const dados = await apiGet("/api/reunioes/");
    setReunioes(dados);
  };

  useEffect(() => {
    getAllReunions();
  }, []);


  const onRefresh = async () => {
    setRefreshing(true);
    await getAllReunions();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title="Reservas Gerais" />
        <Calendar />

        {reunioes.map((element) => {
          const dataReuniao = new Date(element.data_reuniao);
          const horarioFormatado = dataReuniao.toLocaleTimeString("pt-BR", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          const getStatus = (status) => {
            const statusMap = {
              cancelado: StatusReunionEnum.canceled,
              "em andamento": StatusReunionEnum.inProgress,
              pendente: StatusReunionEnum.pending,
              finalizada: StatusReunionEnum.finished,
            };
            return statusMap[status] || StatusReunionEnum.pending;
          };

          return (
            <CardReuniaoGeral
              key={element.id}
              andarNumber={element.Sala.andar}
              horario={horarioFormatado}
              setor={element.Setor.nome.toUpperCase()}
              salaNumber={element.Sala.n_sala}
              status={element.status_reuniao}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B9D6F2",
    flex: 1,
  },
});

export default ReservasGerais;
