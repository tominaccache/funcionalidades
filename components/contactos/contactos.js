import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const [numeroEmergencia, setNumeroEmergencia] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNumeroEmergencia = async () => {
      try {
        const numero = await AsyncStorage.getItem('numeroEmergencia');
        setNumeroEmergencia(numero || '');
      } catch (error) {
        console.log("Error al obtener número de emergencia:", error);
      }
    };

const obtenerContactos = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContactos(data);
        }
      } else {
        Alert.alert('Permiso denegado', 'No se puede acceder a los contactos');
      }
      setCargando(false);
    };

    obtenerNumeroEmergencia();
    obtenerContactos();
  }, []);


  const renderItem = ({ item }) => {
    const esEmergencia = item.phoneNumbers && item.phoneNumbers.some((phone) => phone.number === numeroEmergencia);

    return (
      <View style={styles.contacto}>
        <Text style={styles.nombre}>{item.name}</Text>
        {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
          <Text key={index} style={styles.telefono}>
            {phone.number} {esEmergencia && <Text style={styles.iconoEmergencia}>🚨</Text>}
          </Text>
        ))}
      </View>
    );
  };

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.mensajeVacio}>No hay contactos disponibles.</Text>}
      />
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
    contacto: {
      marginBottom: 15, 
    },
    nombre: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF', 
      textAlign:'center',
      marginTop: '2%', 
    },
    telefono: {
      fontSize: 16,
      color: '#B0BEC5', 
      textAlign:'center',
      marginTop: '2%', 
       paddingBottom: 5,
       borderBottomWidth: 1,
    },
    iconoEmergencia: {
      color: '#FF5252', 
    },
    mensajeVacio: {
        fontSize: 16,
        color: '#B0BEC5', 
        textAlign: 'center',
        marginTop: 20, 
      },
  });

export default Contactos;
