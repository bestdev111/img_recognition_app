import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';
function App() {
  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [img, setImg] = useState(null);
  const onChange = (e) => {
    setUrl(e.target.value)
  }
  const submit = () => {
    if(url.length > 0 & url.slice(0, 8) === 'https://') {
      console.log(url);
      setImg(url);
    } else {
      alert('Please input correct image url');
    }
  }
  useEffect(()=>{
    Tesseract.recognize(
      url, 'eng', { logger: m => {} }
    ).then(({ data: { text } }) => {
      console.log('text=>',text);
      let arr = [];
      arr.push({
        time: '1',
        meter: '2',
        watt: '3',
        sm: '4',
      })
      setData(arr);
    })
  }, [img, url])
  
  console.log('+++',data);
  return (
    <div className="App">
      <div className='App-header'>
        <div>
          {img ?
            <img src={img} className="img" alt="img" />
            : null
          }
        </div>
        <form className='d-flex'>
          <div>
            <input type='text' className='input-form' placeholder='please input image url' value={url} onChange={onChange}/>
          </div>
          <div>
            <input type='button' className='btn' value='Generate' onClick={submit}/>
          </div>
        </form>
        <div>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Meter</th>
                <th>Watt</th>
                <th>S/M</th>
              </tr>
            </thead>
            <tbody>
              {data ? 
                data.map((item, index) => 
                  <tr>
                    <td>{item.time}</td>
                    <td>{item.meter}</td>
                    <td>{item.watt}</td>
                    <td>{item.sm}</td>
                  </tr>
                )
               : <tr><td>No Data</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
