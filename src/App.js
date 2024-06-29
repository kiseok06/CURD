// import './App.css';
import { useState, useCallback } from 'react';
import axios from 'axios';


function App() {
  const [use, setuse] = useState(0)

  const onclick = ()=>{
    return setuse(use + 1)
  }

  return (
    <div className="App">
      <h1>{use}</h1>
      <button onClick={onclick} value="클릭">증가</button>
      <button onClick={minus}>감소</button>
    </div>
  );
}

export default App;
