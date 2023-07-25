import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const DateField = () =>{
    const [value, setValue] = useState(undefined);
    
    const handleChange = ( date, dateString)=>{
        setValue(dateString);
    }
    
    return(
        <RangePicker
            onChange={handleChange} 
            format={dateFormat}
            value={value ? [moment(value[0]), moment(value[1])] : undefined}
        />
    )

}

export default DateField;

