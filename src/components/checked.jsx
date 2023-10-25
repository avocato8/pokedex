import { useSelector } from "react-redux";

function Checked(){
    let mydata = useSelector((state) => {return state});
    console.log(mydata);
}

export default Checked;