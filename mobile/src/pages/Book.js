import React, {useState} from 'react'
import { Alert, Text, SafeAreaView, AsyncStorage, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

import api from '../services/api'

export default function Book({ navigation }) {
  const [date, setDate] = useState('')
  const id = navigation.getParam('id')

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user')

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Solicitção enviada')
    navigation.navigate('List')
  }
  
  function handleCancel() {
    navigation.navigate('List')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}> DATA DE INTERESSE * </Text>
        <TextInput
          style={styles.input}
          placeholder='QUAL DATA VOCE QUER RESERVAR'
          placeholderTextColor='#999'
          keyboardType='email-address'
          autoCapitalize='words'
          autoCorrect={false}
          value={date}
          onChangeText={setDate} // sófunciona aqui no mobile
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Solitar reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Canvelar</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },  

  label: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,  
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  cancelButton: {
    height: 42,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }

})