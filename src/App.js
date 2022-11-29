import './App.css';
import React from 'react'
import GsapAnimator from './gsapAnimator/index.js'

function App(props) {
  return (
    <div className="App">
      <GsapAnimator {...props} />
    </div>
  )
}

export default App
