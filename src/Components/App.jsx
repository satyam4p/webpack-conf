import '../styles/index.scss'
import receipt from '../images/receipt.png';

const App =()=>{
  return(
    <>
      <section className='rendom-image'></section>
      <img src = {receipt} alt="image" width={250}/>
      <main>
        <section>
          <h1>Hello from React</h1>
        </section>
        <section>
          <h4>Testing react integration with Webpack</h4>
        </section>
      </main>
    </>
  )
}

export default App;