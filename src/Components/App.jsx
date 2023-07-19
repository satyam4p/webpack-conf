import '../styles/index.scss'
import { useEffect, useState } from 'react';
import worker from './worker.js';
const App =()=>{
  
  const [worker, setWorker] = useState(null);

  useEffect(()=>{
    let myWorker;
    if(Worker){
      myWorker = new Worker(new URL("./worker.js", import.meta.url));//new syntax as of webpack 5
      setWorker(myWorker);
    }

    return ()=>{
      myWorker.terminate();
    }
  },[]);

  // useEffect(()=>{
    if(worker){
      worker.onmessage = function(message){
        console.log("message in main thread from worker:: ",message.data);
      }
    }
  // },[worker]);

  const handleStartWorker = (e)=>{

    e.preventDefault();
    worker.postMessage({number:1000000000});

  }

  return(
    <>
      {/* <section className='rendom-image'></section> */}
      <main>
        <section>
          <h1>Hello from React</h1>
          <button onClick={e=>handleStartWorker(e)}>start worker</button>
        </section>

        <section>
          <h4>Testing react integration with Webpack</h4>
        </section>
      </main>
    </>
  )
}

export default App;