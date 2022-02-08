import React from 'react'
import styled from 'styled-components';
import { Board } from './Components/Board';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Board />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
`

export default App
