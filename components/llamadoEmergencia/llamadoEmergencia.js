import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LlamadoEmergencia = () => {
  const [numeroEmergencia, setNumeroEmergencia] = useState('');

  // Función para obtener el número de emergencia desde AsyncStorage
  const obtenerNumeroEmergencia = async () => {
    try {
      const numero = await AsyncStorage.getItem('numeroEmergencia');
      if (numero) {
        setNumeroEmergencia(numero); // Actualiza el estado con el número obtenido
      } else {
        Alert.alert('Error', 'No se encontró el número de emergencia');
      }
    } catch (error) {
      console.error('Error al obtener el número de emergencia:', error);
      Alert.alert('Error', 'Hubo un problema al obtener el número de emergencia');
    }
  };

  // Llama a la función para obtener el número al montar el componente
  useEffect(() => {
    obtenerNumeroEmergencia();
  }, []);

  // Función para enviar un mensaje de emergencia (puedes personalizar esta función según sea necesario)
  const enviarMensajeEmergencia = () => {
    Alert.alert('Mensaje de Emergencia', 'Mensaje de emergencia enviado.');
  };

  // Función para realizar una llamada al número de emergencia
  const realizarLlamadaEmergencia = () => {
    if (!numeroEmergencia) {
      Alert.alert('Error', 'No hay número de emergencia disponible');
      return;
    }
    const url = `tel:${numeroEmergencia}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'No se puede realizar la llamada');
        }
      })
      .catch((err) => {
        console.error('Error al abrir el teléfono:', err);
        Alert.alert('Error', 'No se pudo abrir la aplicación del teléfono');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Número de Emergencia: {numeroEmergencia}</Text>
      <TouchableOpacity style={styles.boton} onPress={enviarMensajeEmergencia}>
        <Text style={styles.botonTexto}>Enviar Mensaje de Emergencia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={realizarLlamadaEmergencia}>
        <Text style={styles.botonTexto}>Llamar al Número de Emergencia</Text>
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

export default LlamadoEmergencia;
