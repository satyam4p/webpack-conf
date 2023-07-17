import ReactDOM from 'react-dom/client';
import App from './Components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<h1>Hello from react</h1>);
root.render(<App/>);

const testObject = {
    helloworld: 1,
    newproject:6,
    deadend:4,
}

const newObject = {
    ...testObject,
    leather:5    
}
console.log("newObject:: ", newObject);
console.log(testObject);