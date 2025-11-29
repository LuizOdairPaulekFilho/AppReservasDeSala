import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { apiPost } from "../utils/apiRequests";

export default function Login() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("1234567");
  const [password, setPassword] = useState("123456");

  const fetchLogin = async () => {
    const data = await apiPost('/api/login',{cpf,password})

    if (data.erro) {
      alert("Usuario e/ou senha invalidos");
    } else {
        await SecureStore.setItemAsync('userToken',data.token);
        navigation.navigate("MinhasReunioes");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.imgLogo}
      ></Image>
      <TextInput
        style={[styles.input, styles.bold]}
        onChangeText={(e) => setCpf(e)}
        placeholder="DIGITE SEU DOCUMENTO CPF"
        value={cpf}
      />
      <TextInput
        style={[styles.input, styles.bold]}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
        value={password}
        placeholder="DIGITE SUA SENHA"
      />
      <View style={styles.lowerForm}>
        <Pressable style={styles.button} onPress={fetchLogin}>
          <Text style={styles.txtButton}>ENTRAR</Text>
        </Pressable>
        <Text style={[styles.txtRecovery, styles.bold]}>RECUPERAR SENHA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontFamily: "Montserrat-Bold",
    gap: 25,
  },
  imgLogo: {
    width: 250,
    height: 250,
  },
  lowerForm: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    gap: 25,
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#D3D2D2",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#0353A4",
    padding: "2%",
    width: "100%",
    borderRadius: 5,
  },
  txtButton: {
    color: "#FFFFFF",
  },
  txtRecovery: {
    textDecorationLine: "underline",
    color: "#061A40",
  },
  bold: {
    fontWeight: "bold",
  },
});
