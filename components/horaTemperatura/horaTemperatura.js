import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const ClimaHora = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [horaActual, setHoraActual] = useState('');

  useEffect(() => {
    const obtenerUbicacionYClima = async () => {
      // Obtener permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación no otorgado');
        setCargando(false);
        return;
      }

      // Obtener ubicación
      const ubicacion = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = ubicacion.coords;
      setUbicacion({ latitude, longitude });

      // Obtener clima
      const apiKey = 'TU_API_KEY_AQUI'; // Reemplaza con tu clave API
      try {
        const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        setTemperatura(respuesta.data.main.temp);
      } catch (error) {
        console.log("Error al obtener clima:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUbicacionYClima();

    // Actualizar hora cada segundo
    const intervalo = setInterval(() => {
      const ahora = new Date();
      setHoraActual(ahora.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
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
      {ubicacion && (
        <Text style={styles.ubicacion}>Ubicación: {ubicacion.latitude}, {ubicacion.longitude}</Text>
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
    color: '#FF5252', // Color para errores
  },
});

export default ClimaHora;
