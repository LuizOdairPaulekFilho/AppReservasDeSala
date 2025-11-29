import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getUserID } from "../utils/decodeJwt";
import { Dropdown } from "../components/DropDown";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { apiGet, apiPost } from "../utils/apiRequests";

export default function CadastrarReserva() {
  const [responsavel, setResponsavel] = useState();
  const [setor, setSetor] = useState();
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [tema, setTema] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const dados = await apiGet("/api/usuarios/" + getUserID());
      setResponsavel(dados.nome);
      setSetor(dados.Setor.nome);
    };

    const getRooms = async () => {
      const dados = await apiGet("/api/salas/");
      setSalas(dados);
    };

    getRooms();
    getUserData();
  }, []);

  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        }
      },
      mode: "date",
      display: "default",
    });
  };

  const showTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: hour,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setHour(selectedDate);
        }
      },
      mode: "time",
      display: "default",
    });
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setHour(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    if (Platform.OS === "android") {
      showDatePickerAndroid();
    } else {
      setShowDatePicker(true);
    }
  };

  const showTimePickerModal = () => {
    if (Platform.OS === "android") {
      showTimePickerAndroid();
    } else {
      setShowTimePicker(true);
    }
  };

  const fetchCadastro = async () => {
    try {
      // Validar campos obrigatórios
      if (!selectedSala) {
        Alert.alert("Erro", "Por favor, selecione uma sala");
        return;
      }

    

      // Combinar data e hora
      const dataHora = new Date(date);
      dataHora.setHours(hour.getHours());
      dataHora.setMinutes(hour.getMinutes());
      dataHora.setSeconds(0);
      dataHora.setMilliseconds(0);

      // Formatar data para ISO string
      const inicio = dataHora.toISOString();

      // Preparar dados para envio
      const data = {
        inicio: inicio,
        SalaId: selectedSala.id, // Agora pega o ID corretamente
        SetorId: 1, // Você pode precisar ajustar isso
        userId: getUserID(),
        tema: tema
      };


      const dados = await apiPost("/api/reunioes/", data);
      
      Alert.alert("Sucesso", "Reserva cadastrada com sucesso!");
      
      // Limpar formulário após sucesso
      setTema("");
      setSelectedSala(null);
      setDate(new Date());
      setHour(new Date());

    } catch (error) {
      console.error("Erro ao cadastrar reserva:", error);
      Alert.alert(
        "Erro", 
        error.response?.data?.erro || "Erro ao cadastrar reserva. Tente novamente."
      );
    }
  };

  // Função para lidar com a seleção da sala
  const handleSalaSelect = (sala) => {
    setSelectedSala(sala);
  };

  return (
    <SafeAreaView>
      <Header title="Reservas Gerais"></Header>
      <View style={styles.container}>
        <Text>RESPONSÁVEL</Text>
        <TextInput
          style={[styles.TextInput, { backgroundColor: "#b8b8b8ff" }]}
          value={responsavel}
          editable={false}
        ></TextInput>

        <Text>SETOR</Text>
        <TextInput
          style={[styles.TextInput, { backgroundColor: "#b8b8b8ff" }]}
          value={setor}
          editable={false}
        ></TextInput>

        <Text>SALA</Text>
        <Dropdown 
          options={salas} 
          onSelect={handleSalaSelect}
          selectedValue={selectedSala}
        ></Dropdown>

        {/* Mostrar sala selecionada para debug */}
        {selectedSala && (
          <Text style={styles.selectedSalaText}>
            Sala selecionada: {selectedSala.n_sala} (Andar: {selectedSala.andar}) - ID: {selectedSala.id}
          </Text>
        )}

        <Text>DATA</Text>
        <Pressable onPress={showDatePickerModal} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            📅 {date.toLocaleDateString("pt-BR")}
          </Text>
        </Pressable>

        <Text>HORÁRIO</Text>
        <Pressable onPress={showTimePickerModal} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            ⏰{" "}
            {hour.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>

        {/* Date Picker Modal para iOS */}
        {showDatePicker && (
          <RNDateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChangeDate}
          />
        )}

        {/* Time Picker Modal para iOS */}
        {showTimePicker && (
          <RNDateTimePicker
            mode="time"
            display="spinner"
            value={hour}
            onChange={onChangeTime}
          />
        )}

       

        <Pressable style={styles.button} onPress={fetchCadastro}>
          <Text style={styles.txtButton}>CADASTRAR RESERVA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 5,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#000000",
    width: "80%",
    borderRadius: 10,
    padding: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#000000",
    width: "80%",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f0f0f0",
  },
  dateButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0353A4",
    padding: "4%",
    width: "80%",
    borderRadius: 5,
    marginTop: 20,
  },
  txtButton: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedSalaText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});