import { Html } from "@react-three/drei";
import SingleTodayTodo from "./single_todo/SingleTodayTodo"
import { useRef } from "react";
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";

export default function TodaysChecklist({
    todaysTodosFiltered, 
    deactivatedTodaysTodos, 
    setDeactivatedTodaysTodos,
    isViewNarrow,
    isWide,
    rightPosition,
    topPosition,
    currentPanel
}) {

    function handleDeactivateTodaysTodo(id) {
        // deactivatedTodaysTodos will be grayed out but can be reactivated  
        // for the day if they haven't passed their scheduled reminder time
        let newDeactivatedTodaysTodos = [...deactivatedTodaysTodos];

        if (newDeactivatedTodaysTodos.includes(id)) {
            newDeactivatedTodaysTodos = newDeactivatedTodaysTodos.filter(todoId => {
                return todoId !== id
            })
        } else {
            newDeactivatedTodaysTodos.push(id)
        }

        setDeactivatedTodaysTodos([...newDeactivatedTodaysTodos])
    }

    const fullPanelRef = useRef(null);

    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "todays-todos" ? 1 : 0, 0.1);
        }
    })

    return (
        <Html ref={fullPanelRef} scale={isViewNarrow ? [.009, .009, .009] : [.004, .004, .004]} className="dialog-container" position={isWide === true ? rightPosition : topPosition} transform sprite>
            <form>
                <h3>Today's Checklist</h3>
                <ul>
                    {
                        todaysTodosFiltered?.map((todo, index) => {
                            return (
                                <SingleTodayTodo
                                    key={todo.id + index}
                                    todo={todo}
                                    deactivatedTodaysTodos={deactivatedTodaysTodos}
                                    handleDeactivateTodaysTodo={handleDeactivateTodaysTodo}
                                />
                            )
                        })
                    }
                </ul>
            </form>
        </Html>
    )
}