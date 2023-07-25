import BoardLayout from "../../Components/BoardLayout/BoardLayout";
import './stylesheet.scss';
import useTasks from "../../helpers/hooks/useTasks";
import { useEffect } from "react";

const Board = ()=>{

    const fetchTasks = useTasks();

    useEffect(()=>{

        fetchTasks();

    },[fetchTasks])

    return(
        <div className="board-container">
            <BoardLayout/>
        </div>
    )
}

export default Board;