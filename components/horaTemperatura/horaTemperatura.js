import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const HoraTemperatura = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [horaActual, setHoraActual] = useState('');

  useEffect(() => {
    const obtenerUbicacionYClima = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación no otorgado');
        setCargando(false);
        return;
      }

      const ubicacion = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = ubicacion.coords;
      setUbicacion({ latitude, longitude });

      try {
        const respuesta = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        setTemperatura(respuesta.data.current_weather.temperature);
      } catch (error) {
        console.log("Error al obtener clima:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUbicacionYClima();

    const intervalo = setInterval(() => {
      const ahora = new Date();
      setHoraActual(ahora.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalo); 
  }, []);

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hora}>Hora actual: {horaActual}</Text>
      {temperatura !== null ? (
        <Text style={styles.temperatura}>Temperatura: {temperatura} °C</Text>
      ) : (
        <Text style={styles.error}>No se pudo obtener la temperatura.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238',
  },
  hora: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  temperatura: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ubicacion: {
    fontSize: 18,
    color: '#B0BEC5',
  },
  error: {
    fontSize: 18,
    color: '#FF5252', 
  },
});

export default HoraTemperatura;
