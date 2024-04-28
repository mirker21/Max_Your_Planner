import { generateUUID } from "three/src/math/MathUtils";

export default function FormItemName({todo, setTodo, checklist, setChecklist}) {

    function handleChange(event) {
        setTodo(event.target.value);
    }

    function addTodo() {
        if (todo !== '') {
            const newTodo = {
                todo: todo,
                id: generateUUID()
            }
            const newChecklist = [...checklist, newTodo];
            setChecklist([...newChecklist])
            setTodo('')
        }
    }

    function removeTodo(event) {
        let newChecklist = [...checklist];
        newChecklist = newChecklist.filter(todo => {
            return todo.id !== event.target.id;
        })
        setChecklist([...newChecklist])
    }

    return ( 
        <div>
            <h2>Todo Item Names</h2>
            <section>
                <h3>Add Items</h3>

                <section className="subsection">
                    <div>
                        <input type="text" id="item-name" onChange={handleChange} value={todo} />
                        <label htmlFor="item-name">Item Name</label>
                    </div>
                    {
                        todo !== ''
                        &&
                        <button type="button" onClick={addTodo}>Add item to checklist</button>
                    }
                </section>

                {
                    checklist.length > 0

                    &&

                    <div className="result">
                        <hr />

                        <h3>Items Added</h3>

                        <ul className="items-added-container">
                            {
                                checklist.map(todo => (
                                    <li className="list-item" key={todo.todo + todo.id} id={todo.todo + todo.id}>
                                        <button type="button" className="add-todo-form-remove-item-name" onClick={removeTodo} id={todo.id}>×</button>
                                        <p className="item-name">{todo.todo}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </section>
        </div>
    )
}