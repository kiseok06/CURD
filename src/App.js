import './App.css';
import { useState, useEffect } from 'react';
// import Board from './components/board' 
import axios from 'axios';

function App() {
//   const [id, setID] = useState(0)
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({context: '', name: '' });
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    axios.get('http://localhost:3001/data')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        alert(error);
      })
  }

  const createData = () => {
    axios.post('http://localhost:3001/data', newData)
      .then(res => {
        setData([...data, res.data]);
        setNewData({ context: '' });
      })
      .catch(error => {
        alert(error);
      })
  }

  const updateData = () => {
    axios.put(`http://localhost:3001/data/${selectedData.id}`,selectedData)
      .then(res => {
        const newData = data.map(item => {
          if (item.id === selectedData.id) {
            return res.data;
          }
          return item;
        });
        setData(newData);
        setSelectedData(null);
      })
      .catch(error => {
        alert(error);
      })
  }

  const deleteData = (id) => {
    axios.delete(`http://localhost:3001/data/${id}`)
      .then(() => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      })
      .catch(error => {
        alert(error);
      })
  }

  const onChange = (event) => {
    setNewData({ ...newData, [event.target.name]: event.target.value, 
        // [event.target.context]: event.target.value
    });
  }

  const edit = (item) => {
    setSelectedData(item);
  }

  const canc = () => {
    setSelectedData(null);
  }

  return (
    <div>
      <h1>게시판</h1>
      <div>
        <h2>데이터 추가</h2>
        <form onSubmit={createData}>
          <label>
            내용
            <input placeholder='제목입력' type="text" name="name" value={newData.name} onChange={onChange} />
            <input placeholder='내용입력' type="text" name="context" value={newData.context} onChange={onChange} />
          </label>
          <button type="submit">추가</button>
        </form>
      </div>
      {selectedData && (
        <div>
          <h2>수정 데이터</h2>
          <form onSubmit={updateData}>
            <label>
              데이터:
              <input placeholder='제목입력' type="text" name="name" value={selectedData.name} onChange={(event) => setSelectedData({ ...selectedData, name: event.target.value })} />
              <input placeholder='내용입력' type="text" name="context" value={selectedData.context} onChange={(event) => setSelectedData({ ...selectedData, context: event.target.value })} />
            </label>
            <button type="submit">저장</button>
            <button onClick={canc}>취소</button>
          </form>
        </div>
      )}
      <ul className='title'>
      <li>제목</li>
      <li>내용</li>
      </ul>
        {data.map(item => (
          <ul key={item.id} className='wrap2'>
            <li className='first'>{item.name}</li>
            <li className='second'>{item.context}</li>
            <button className='one' onClick={() => edit(item)}>수정</button>
            <button className='two' onClick={() => deleteData(item.id)}>삭제</button>
          </ul>
        ))}
    </div>
  );
}

export default App;