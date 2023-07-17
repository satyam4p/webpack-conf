
import './styles/index.scss';

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