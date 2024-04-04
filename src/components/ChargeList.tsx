import { useEffect, useState } from "react";
import { apiWoovi } from "../lib/apiWoovi";
import { FlatList, Text, View } from "react-native";

export const ChargeList = () => {
  const [charges, setCharges] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiWoovi("/charge");

        const { charges } = await response.json();

        setCharges(charges);
      } catch (e) {
        console.log({ e });
      }
    })();
  }, []);

  return (
    <View style={{ display: "flex", gap: 10 }}>
      {charges.map((charge) => (
        <View>
          <Text>Valor em centavos: {charge.value}</Text>
          <Text>Status: {charge.status}</Text>
        </View>
      ))}
    </View>
  );
};
