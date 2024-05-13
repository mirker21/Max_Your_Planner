import { Html } from "@react-three/drei";
import SingleTodayTodo from "./single_todo/SingleTodayTodo"
import { useRef } from "react";
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import ClosePanelButton from "./ClosePanelButton";
import { A11y } from "@react-three/a11y";

export default function TodaysChecklistPanel({
    todaysTodosFiltered, 
    deactivatedTodaysTodos, 
    setDeactivatedTodaysTodos,
    isViewNarrow,
    isWide,
    rightPosition,
    topPosition,
    currentPanel,
    setCurrentPanel,
    setCurrentAnimation,
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

    // Huge thanks to Ask-Alice from https://www.reddit.com/r/threejs/comments/lg54ko/fade_animation_when_changing_views_react_three/ for showing a method to change transparency of element.
    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "todays-todos" ? 1 : 0, 0.1);
        }
    })

    return (
        <A11y role="content" description="Today's Checklist Panel">
            <Html ref={fullPanelRef} scale={isViewNarrow ? [.009, .009, .009] : [.004, .004, .004]} className="dialog-container" position={isWide === true ? rightPosition : topPosition} transform sprite>
                <form>
                    <h3>Today's Checklist</h3>
                    <ul role="list" aria-label="All of Today's To-Do s">
                        {
                            todaysTodosFiltered?.map((todo, index) => {
                                return (
                                    <SingleTodayTodo
                                        key={todo.id + index}
                                        todo={todo}
                                        index={index}
                                        deactivatedTodaysTodos={deactivatedTodaysTodos}
                                        handleDeactivateTodaysTodo={handleDeactivateTodaysTodo}
                                    />
                                )
                            })
                        }
                    </ul>
                </form>
                <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
            </Html>
        </A11y>
    )
}