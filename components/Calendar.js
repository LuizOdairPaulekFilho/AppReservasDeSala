import Octicons from "@react-native-vector-icons/octicons";
import { StyleSheet, Text, View } from "react-native";

const Calendar = () => {
  return (
    <View style={styles.calendarHeader}>
      <Text style={styles.underline}>20/SEG</Text>
      <View style={styles.calendarMonth}>
        <Octicons name="triangle-left" size={30}></Octicons>
        <Text style={styles.underline}>20 MAI</Text>
        <Octicons name="triangle-right" size={30}></Octicons>
      </View>
      <Text style={styles.underline}>2025</Text>
    </View>
  );
};

export default Calendar

const styles = StyleSheet.create({
  calendarHeader: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "5%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  calendarMonth: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
   underline:{
    textDecorationLine:"underline",
    fontWeight:"bold"
  }
});
