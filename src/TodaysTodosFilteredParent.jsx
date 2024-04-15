import { useEffect, useState, useMemo } from "react";
import ProjectCanvas from "./ProjectCanvas";
import Notifications from "./components/Notifications";

export default function TodaysTodosFilteredParent({
        todos,
        setTodos,
        currentPanel,
        setCurrentPanel,
        getTodaysTodos
}) {

    const [deletedTodaysTodos, setDeletedTodaysTodos] = useState([]);
    const todaysTodosFiltered = useMemo(() => {
        let todaysTodos = getTodaysTodos(todos)
        if (deletedTodaysTodos.length > 0) {
            todaysTodos = todaysTodos.filter(item => {
                !deletedTodaysTodos.includes(item.id)
            })
            setDeletedTodaysTodos([])
        }

        return todaysTodos;
        
    }, [todos, deletedTodaysTodos])

    return (
        <>
            <Notifications
                todaysTodosFiltered={todaysTodosFiltered}
            />
            <ProjectCanvas 
                todos={todos} 
                setTodos={setTodos} 
                currentPanel={currentPanel} 
                setCurrentPanel={setCurrentPanel} 
                deletedTodaysTodos={deletedTodaysTodos}
                setDeletedTodaysTodos={setDeletedTodaysTodos}
                todaysTodosFiltered={todaysTodosFiltered}
            />
        </>
    )
}