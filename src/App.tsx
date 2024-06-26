import "core-js/stable";

import { registerRootComponent } from "expo";
import { useState } from "react";
import { useOpenPix } from "@openpix/react";
import QRCode from "react-native-qrcode-svg";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { centsToMoney } from "./utils/centsToMoney";
import { Layout } from "./components/Layout";
import { ChargeList } from "./components/ChargeList";

const App = () => {
  const [charge, setCharge] = useState(null);
  const [value, setValue] = useState("");

  const onChangeText = (inputText: string) => {
    setValue(inputText);
  };

  const onPay = (charge: unknown) => {
    alert(`Pagamento recebido: ${charge}`);
    setCharge(null);
  };

  const { chargeCreate } = useOpenPix({
    appID: process.env.EXPO_PUBLIC_APP_ID,
    onPay,
  });

  const newCharge = async () => {
    if (!Number(value)) {
      alert("Valor inválido, valor deve ser em centavos. Ex: 1000 = R$10,00");
      return;
    }

    const payload = {
      correlationID: Math.random().toString(36).substring(7),
      value,
      comment: "IFSC",
    };

    const result = await chargeCreate(payload);
    const { charge, error } = result;

    if (error) {
      console.error("Error creating charge", error);
      return;
    }

    setCharge(charge);
  };

  const getBody = () => {
    if (charge) {
      return (
        <>
          <Text style={styles.sectionHeader}>Criar Cobrança</Text>
          <QRCode size={200} value={charge.brCode} />
          <Text>Valor: {centsToMoney(charge.value)}</Text>
          <Text>Correlation ID: {charge.correlationID}</Text>
          <Text>Código QR: {charge.brCode}</Text>
        </>
      );
    }

    return (
      <View style={styles.actions}>
        <Text style={styles.sectionHeader}>Criar Cobrança</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder="Valor em centavos"
        />
        <Pressable
          onPressOut={newCharge}
          style={({ pressed }) => [
            styles.button,
            pressed || !!charge ? styles.disabledButton : null,
          ]}
          disabled={!!charge}
        >
          <Text style={styles.text}>Criar cobrança</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Layout>
      <View style={styles.section}>
        <View>{getBody()}</View>
        <View>
          <Text style={styles.sectionHeader}>Ultimas Cobranças</Text>
          <ChargeList />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    height: "100%",
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#03D69D",
    width: 200,
  },
  disabledButton: {
    backgroundColor: "#C0C0C0", // Gray color when disabled
  },
  input: {
    height: 40,
    borderColor: "#03D69D",
    borderWidth: 1,
    borderRadius: 4,
    elevation: 3,
    paddingVertical: 12,
    width: 200,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
  },
  actions: {
    display: "flex",
    gap: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "#03D69D",
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 40,
    height: "70%",
    marginHorizontal: 20,
  },
});

export default registerRootComponent(App);
