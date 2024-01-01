import React from 'react'
import ReactDOM from 'react-dom'
import { useTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import './index.css'

import Game from './Components/Game'

const App = () => {
  const theme = useTheme()
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
