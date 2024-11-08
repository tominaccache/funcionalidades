import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QrPantalla() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código QR</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value="https://docs.google.com/document/d/10grr0hrJ7Ga0kDlMdbAOIgwqdIblLKh1ocEoYNTUoZM/edit?usp=sharing"
          size={200}
          color="#2c3e50"
          backgroundColor="#ecf0f1"
        />
      </View>
      <Text style={styles.info}>Escanea este código QR para ver al integrante</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238',  
    padding: 20,
  },
  qrContainer: {
    backgroundColor: '#DCDCDC',  
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF',  
  },
  info: {
    marginTop:40,
    fontSize: 18,
    color: '#FFFFFF', 
    textAlign: 'center',
  },
});