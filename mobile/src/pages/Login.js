import React,  { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'

import api from '../services/api'

import logo from '../../assets/logo.png'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List')
      }
    })
  }, [])

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('techs', techs)

    navigation.navigate('List')
  }

  return (//                                               aparentemente eu preciso disso pro moto G5
    <KeyboardAvoidingView enabled={Platform.OS === 'ios' || Platform.OS === 'android'} behavior='padding' style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}> SEU EMAIL * </Text>
        <TextInput
          style={styles.input}
          placeholder='Seu email'
          placeholderTextColor='#999'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail} // sófunciona aqui no mobile
        />

        <Text style={styles.label}>TECNOLOGIAS * </Text>
        <TextInput
          style={styles.input}
          placeholder='Techs de interesse' 
          placeholderTextColor='#999'
          keyboardType='email-address'
          autoCapitalize='words'
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {/* compnentes aninhados não herdam estilos */ }
          <Text style={styles.buttonText}>Ecnontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // p ocupar todo o tamanho da tela
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
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

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

