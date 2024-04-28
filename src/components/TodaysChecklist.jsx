import SingleTodayTodo from "./SingleTodayTodo"

export default function TodaysChecklist({todaysTodosFiltered, deactivatedTodaysTodos, setDeactivatedTodaysTodos}) {

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

    return (
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
    )
}