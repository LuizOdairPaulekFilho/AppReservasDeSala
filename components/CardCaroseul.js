import { StyleSheet, Text, Pressable } from "react-native";
import { apiPost } from "../utils/apiRequests";

export default function CardCarousel({
  width,
  height,
  visible,
  setor,
  status,
  data,
  onPress,
  onDelete,
  id,
}) {
  async function handleDelete() {
    await apiPost("/api/reunioes/" + id + "/cancelar");
    onDelete();
  }

  return (
    <Pressable
      onPress={onPress}
      style={[{ width, height, opacity: visible ? 1 : 0.5 }, styles.card]}
    >
      <Text style={styles.label}>SETOR: {setor}</Text>
      <Text style={styles.label}>STATUS: {status}</Text>
      <Text style={styles.label}>DATA: {data}</Text>

      <Pressable style={styles.cancelar} onPress={handleDelete}>
        <Text style={styles.labelButton}>Cancelar</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#006DAA",
    margin: 10,
    padding: 15,
    overflow: "hidden",
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
  },
  labelButton: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  cancelar: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#bb2929ff",
    borderRadius: 10,
    width: 100,
  },
});
