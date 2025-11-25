import { StyleSheet, Text, View } from "react-native";
import StatusReunionEnum from "../enums/StatusReunionEnum";

const CardReuniaoGeral = ({setor, status, horario, salaNumber, andarNumber}) => {
  let color = "#FF0000";
  if(status == StatusReunionEnum.finished) color = "#37c957ff";  
  if(status == StatusReunionEnum.pending) color = "#e5ff00ff";  

  return (
    <View style={styles.card}>
      <View style={styles.column}>
        <Text style={[styles.white,styles.setorText]}>{setor}</Text>
        <Text style={styles.white}>Sala: Nº{salaNumber}, Andar. Nº{andarNumber}a</Text>
      </View>

      <View style={[styles.column,styles.statusColumn]}>
        <Text style={[styles.white]}> {status} <Text style={[styles.ballStatus,{color:color}]}>•</Text></Text>
        <Text style={styles.white}> {horario} AM </Text>
      </View>
    </View>
  );
};

export default CardReuniaoGeral

const styles = StyleSheet.create({
    column:{
        display:"flex",
        flexDirection:"column",
    },
    ballStatus: {
      fontWeight:"bold",
      fontSize:25,
    },
    card:{
        backgroundColor:"#006DAA",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        width:"95%",
        borderRadius:5,
        margin:10,
        padding:10
    },
    white:{
        color:"#FFF",
        fontWeight:"bold"
    },
    setorText:{
      fontSize:25,
    },
    statusColumn:{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }
    
})
