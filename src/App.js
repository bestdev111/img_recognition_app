import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { ProgressBar } from 'react-loader-spinner';
import New from './New'
import './App.css';
function App() {
  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(null);
  const onChange = (e) => {
    setUrl(e.target.value)
  }
  const submit = () => {
    if(url.length > 0) {
      setLoading(false);
      setImg(url);
    } else {
      alert('Please input correct image url');
    }
  }
  useEffect(()=>{
    func();
  }, [img, url])
  const func = async () => {
    await Tesseract.recognize(
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
      setLoading(true);
    })
  }
  
  console.log('+++',data);
  return (
    <div className="App">
      <div className='App-header'>
        <img src='https://tesseract.projectnaptha.com/img/eng_bw.png' className="img" alt="img" />
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
          {loading ? 
            <>
              {data ? 
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
                    {data.map((item, index) => 
                      <tr key={index}>
                        <td>{item.time}</td>
                        <td>{item.meter}</td>
                        <td>{item.watt}</td>
                        <td>{item.sm}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              : null
              }
            </>
           : <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor = '#F4442E'
              barColor = '#51E5FF'
            />
          }
        </div>
      </div>
      <div>
        <New />
      </div>
    </div>
  );
}

export default App;
