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
            <h2 aria-label="Add/Remove To-Do Item Names">Todo Item Names</h2>
            <section>
                <h3 aria-hidden="true">Add Items</h3>

                <section className="subsection">
                    <div>
                        <input  aria-label="Enter new to-do item name" type="text" id="item-name" onChange={handleChange} value={todo} />
                        <label aria-hidden="true" htmlFor="item-name">Item Name</label>
                    </div>
                    <button aria-disabled={todo === ''} disabled={todo === ''} aria-label={(todo === '' ? 'To-do item text input is currently empty.' : 'Add new to-do item') + ' Inspect/remove your added to-do s below'} type="button" onClick={addTodo}>Add item to checklist</button>
                </section>

                {
                    checklist.length > 0

                    &&

                    <div className="result">
                        <hr />

                        <h3 aria-hidden="true">Items Added</h3>

                        <ul className="items-added-container" aria-label="Items added">
                            {
                                checklist.map((todo, index) => (
                                    <li className="list-item" key={todo.todo + todo.id} id={todo.todo + todo.id}>
                                        <button aria-label={'Remove Item Number ' + (parseInt(index) + 1) + ': ' + todo.todo} type="button" className="add-todo-form-remove-item-name" onClick={removeTodo} id={todo.id}>×</button>
                                        <p aria-hidden="true" className="item-name">{todo.todo}</p>
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