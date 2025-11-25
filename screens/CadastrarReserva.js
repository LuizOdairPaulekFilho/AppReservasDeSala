import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getJWToken, getUserID } from "../utils/decodeJwt";

export default function CadastrarReserva() {
  const [responsavel, setResponsavel] = useState();
  const [setor, setSetor] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const token = getJWToken();
      console.log("tyoken =>", token)
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
      setSetor(dados.Setor.nome)
    };

    getUserData()
  }, []);

  return (
    <SafeAreaView>
      <Header title="Reservas Gerais"></Header>
      <View style={styles.container}>
        <Text>RESPONSÁVEL</Text>
        <TextInput style={[styles.TextInput,{backgroundColor:"#b8b8b8ff"}]} value={responsavel} editable={false}></TextInput>
        <Text>SETOR</Text>
        <TextInput style={[styles.TextInput,{backgroundColor:"#b8b8b8ff"}]} value={setor} editable={false}></TextInput>


        <Text>SALA</Text>
        <Select style={styles.TextInput}>
          <Option value={1}>1</Option>
          <Option  value={1}>2</Option>
        </Select>


        <Text>DATA</Text>
        <TextInput style={styles.TextInput}> </TextInput>
        <Text>TEMA</Text>
        <TextInput style={styles.TextInput}></TextInput>

        <Pressable style={styles.button}>
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
  },
  button: {
    backgroundColor: "#0353A4",
    padding: "4%",
    width: "80%",
    borderRadius: 5,
  },
  txtButton: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
