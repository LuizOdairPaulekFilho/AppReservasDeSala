import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@react-native-vector-icons/octicons";

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Octicons name="three-bars" color="#ffffffff" size={30} />
      </Pressable>
      <View style={{width:"100%"}}><Text style={styles.txtHeader}>{title}</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0353A4",
    height: 50,
    display: "flex",
    alignItems:"center",
    flexDirection:"row"
  },
  txtHeader: {
    color: "#FFF",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  txtPressable: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
