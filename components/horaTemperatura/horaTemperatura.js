import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const HoraTemperatura = () => {
  const [temperatura, setTemperatura] = useState('');
  const [fechaHora, setFechaHora] = useState(new Date().toLocaleString());

  useEffect(() => {
    const obtenerTemperatura = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=TU_API_KEY&units=metric');
        const data = await response.json();
        setTemperatura(data.main.temp);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerTemperatura();
    const intervalo = setInterval(() => setFechaHora(new Date().toLocaleString()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View>
      <Text>Fecha y Hora: {fechaHora}</Text>
      <Text>Temperatura: {temperatura} °C</Text>
    </View>
  );
};

export default HoraTemperatura;
