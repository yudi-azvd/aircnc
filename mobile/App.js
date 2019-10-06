import React from 'react'; 
import { YellowBox } from 'react-native'

// socket io client usa algumas coisas do browser que o native não tem
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
])

import Routes from './src/routes'

export default function App() {
  return <Routes />
}
