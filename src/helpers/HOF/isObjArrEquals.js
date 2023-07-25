import { xorWith, isEmpty, isEqual } from 'lodash';

export default function isObjArrayEqual(x,y){
    return isEmpty(xorWith(x,y, isEqual));
}


