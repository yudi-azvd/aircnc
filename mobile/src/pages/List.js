import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, Text, ScrollView, Image,  AsyncStorage,  StyleSheet } from 'react-native'

import SpotList from '../components/SpotList' 

import logo from '../../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.15.11:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva foi em ${booking.spot.company} em ${booking.date} foi ${booking.approved? 'APROVADA': 'REJEITADA'}`)
      })
    })
  })

  useEffect(() => {
    AsyncStorage
      .getItem('techs')
      .then(storagedTechs => {
        console.log('storage techs', storagedTechs)

        const techsArray = storagedTechs.split(',').map(tech => tech.trim())
        setTechs(techsArray)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  function handleBack() {
    AsyncStorage.setItem('user', '').then(() => {
      navigation.navigate('Login')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <ScrollView>
        {techs.map(tech => 
          <SpotList 
            key={tech}
            tech={tech} 
          />
        )}
      </ScrollView>

      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={{ color: '#fff' }} > Back to Login </Text> 
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30 // SafeAreaView não tá funfando
  },

  button: {
    width: '95%',
    height: 32,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10 // talvez fique sobreposto à lista de spots
  },

})