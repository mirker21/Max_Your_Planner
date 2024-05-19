import { useState } from "react";

export default function FormCategory({previousCategories, category, setCategory}) {
    const [isPreviousCategoriesChecked, setIsPreviousCategoriesChecked] = useState(false)

    function handleChange(event) {
        if (event.target.id === 'category-create' || event.target.id === 'category-select') {
            setCategory(event.target.value);
        }
    }

    return (
        <div id="add-edit-todo-form-category-container">                
            <h2 aria-label="Category">Category</h2>

            <section>
                <section className="subsection"> 
                    <div>
                        <input 
                            aria-label={"Use previous category? This checkbox switches the add new category text input out for a select input that contains categories used in previous to-do s. " + (previousCategories.length === 0 ? 'No previous categories have been created yet' : '')} 
                            aria-disabled={previousCategories.length === 0}
                            disabled={previousCategories.length === 0}
                            type="checkbox" 
                            id="category-create-checked" 
                            name="category-create-checked" 
                            checked={isPreviousCategoriesChecked} 
                            onChange={() => (setIsPreviousCategoriesChecked(!isPreviousCategoriesChecked), setCategory(''))}
                        />
                        <label aria-hidden="true" htmlFor="category-create-checked">Use Previous Category</label>
                    </div>                       
                </section>

                {
                    isPreviousCategoriesChecked
                    ?
                    <section className="subsection">
                        <div>
                            <select 
                                aria-label="Select from previous categories"
                                id="category-select" 
                                name="category-select" 
                                onChange={handleChange} 
                                value={category}
                            >
                                {
                                    previousCategories?.map((singleCategory, index) => {
                                        return (
                                            <option aria-label={'Category ' + (parseInt(index)) + ': ' + singleCategory} key={singleCategory} value={singleCategory}>{singleCategory}</option>
                                        )
                                    })
                                }
                                <option aria-label="Category: None" value=''>None</option>
                            </select>
                            
                            <label aria-hidden="true" htmlFor="category-select">Choose from Previous Categories</label>
                        </div>
                    </section>
                    :
                    <section className="subsection">                        
                        <div>
                            <input aria-label="Create New Category" type="text" id="category-create" name="category-create" value={category} onChange={handleChange}/>
                            <label aria-hidden="true" htmlFor="category-create">Create New Category</label>
                        </div>
                    </section>
                }
            </section>
        </div>
    )
}