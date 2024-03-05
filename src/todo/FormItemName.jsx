export default function FormItemName({todo, setTodo, checklist, setChecklist}) {

    function handleChange(event) {
        setTodo(event.target.value);
    }

    function addTodo() {
        if (todo !== '') {
            const newChecklist = [...checklist, todo];
            setChecklist([...newChecklist])
            setTodo('')
        }
    }

    function removeTodo(event) {
        let newChecklist = [...checklist];
        newChecklist = newChecklist.filter((item, index) => {
            item + index !== event.target.parentNode.id;
        })
        setChecklist([...newChecklist])
    }

    return ( 
        <div>
            <section>
                <h3>Item Name</h3>

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

                        <li>
                            {
                                checklist.map((item, index) => (
                                    <ul className="list-item" key={item + index} id={item + index}>
                                        <button type="button" onClick={removeTodo}>×</button>
                                        <p>{item}</p>
                                    </ul>
                                ))
                            }
                        </li>
                    </div>
                }
            </section>
        </div>
    )
}