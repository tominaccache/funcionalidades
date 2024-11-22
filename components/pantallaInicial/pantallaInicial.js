import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';

const PantallaInicial = ({ navigation }) => {
  const [accelerometerData, setAccelerometerData] = useState({});
  const [isShakeDetected, setIsShakeDetected] = useState(false);
  const emergencyNumber = "12345678"; // Replace with the configured number

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); // Check for shake every 100ms
    const subscription = Accelerometer.addListener(data => {
      setAccelerometerData(data);
      detectShake(data);
    });
    return () => subscription.remove();
  }, []);

  const detectShake = ({ x, y, z }) => {
    const threshold = 1.5; // Adjust sensitivity
    const totalForce = Math.sqrt(x * x + y * y + z * z);

    if (totalForce > threshold && !isShakeDetected) {
      setIsShakeDetected(true);
      sendEmergencyMessage();
      setTimeout(() => setIsShakeDetected(false), 2000); // Prevent rapid re-triggering
    }
  };

  const sendEmergencyMessage = async () => {
    const message = "¡Emergencia! Necesito ayuda inmediata.";
    try {



      const isAvailable = await SMS.isAvailableAsync();
       if (isAvailable) {
       await SMS.sendSMSAsync(emergencyNumber, message);
       } else {
        Alert.alert("Error", "El envío de SMS no está soportado en este dispositivo.");
       }
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('ConfiguracionNumero')}
      >
        <Text style={styles.botonTexto}>Configuración de Número de Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Contactos')}
      >
        <Text style={styles.botonTexto}>Contactos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('HoraTemperatura')}
      >
        <Text style={styles.botonTexto}>Hora y Temperatura</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('LlamadoEmergencia')}
      >
        <Text style={styles.botonTexto}>Llamado de Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('QrPantalla')}
      >
        <Text style={styles.botonTexto}>Acerca de nosotros</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#263238',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  boton: {
    backgroundColor: '#37474F',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  botonTexto: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PantallaInicial;
