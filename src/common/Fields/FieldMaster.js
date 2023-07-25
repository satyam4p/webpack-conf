import DateField from './Date/Date';
import TextField from './Text/TextField';
import LookupField from './Lookup/Lookup';
import TextArea from './TextArea/TextArea';
import LabelField from './Label/Label';

const fieldMaster = {
    date : DateField,
    text : TextField,
    lookup : LookupField,
    textArea : TextArea,
    label : LabelField
}

export default fieldMaster;