import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@react-native-vector-icons/octicons";
import CardReuniaoGeral from "../components/CardReuniaoGeral";
import StatusReunionEnum from "../enums/StatusReunionEnum";
import Calendar from "../components/Calendar";

const ReservasGerais = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Header title="Reservas Gerais"></Header>
        <Calendar></Calendar>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
        <CardReuniaoGeral
          andarNumber="5"
          horario="12:00"
          setor="VAREJO"
          salaNumber="10"
          status={StatusReunionEnum.finished}
        ></CardReuniaoGeral>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B9D6F2",
    height: "100%",
  },
});

export default ReservasGerais;
