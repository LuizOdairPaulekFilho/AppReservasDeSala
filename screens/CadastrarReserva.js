import { Pressable, StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getJWToken, getUserID } from "../utils/decodeJwt";
import { Dropdown } from "../components/DropDown";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function CadastrarReserva() {
  const [responsavel, setResponsavel] = useState();
  const [setor, setSetor] = useState();
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  async function fetchCadastro(){
    
  }

  useEffect(() => {
    const getUserData = async () => {
      const token = getJWToken();
      console.log("token =>", token);
      const requests = await fetch(
        "http://10.10.4.161:3000/api/usuarios/" + getUserID(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dados = await requests.json();
      
      console.log(dados);
      setResponsavel(dados.nome);
      setSetor(dados.Setor.nome);
    };

    getUserData();
  }, []);

  // Para Android - usando DateTimePickerAndroid
  const showDatePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        }
      },
      mode: 'date',
      display: 'default',
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
      mode: 'time',
      display: 'default',
    });
  };

  // Para iOS - usando state para controlar visibilidade
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
    if (Platform.OS === 'android') {
      showDatePickerAndroid();
    } else {
      setShowDatePicker(true);
    }
  };

  const showTimePickerModal = () => {
    if (Platform.OS === 'android') {
      showTimePickerAndroid();
    } else {
      setShowTimePicker(true);
    }
  };

  const [value, setValue] = useState(null);

  return (
    <SafeAreaView>
      <Header title="Reservas Gerais"></Header>
      <View style={styles.container}>
        <Text>RESPONSÁVEL</Text>
        <TextInput style={[styles.TextInput,{backgroundColor:"#b8b8b8ff"}]} value={responsavel} editable={false}></TextInput>
        
        <Text>SETOR</Text>
        <TextInput style={[styles.TextInput,{backgroundColor:"#b8b8b8ff"}]} value={setor} editable={false}></TextInput>

        <Text>SALA</Text>
        <Dropdown options={[1,2,3]}></Dropdown>

        <Text>DATA</Text>
        <Pressable onPress={showDatePickerModal} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            📅 {date.toLocaleDateString('pt-BR')}
          </Text>
        </Pressable>

        <Text>HORÁRIO</Text>
        <Pressable onPress={showTimePickerModal} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            ⏰ {hour.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
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

        <Text>TEMA</Text>
        <TextInput style={styles.TextInput}></TextInput>

        <Pressable style={styles.button} onPress={fetch}>
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});