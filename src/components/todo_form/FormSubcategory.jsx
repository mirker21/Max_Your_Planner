import { useState } from "react";

export default function FormSubcategory({previousSubcategories, subcategory, setSubcategory}) {
    const [isPreviousSubcategoriesChecked, setIsPreviousSubcategoriesChecked] = useState(false)

    function handleChange(event) {
        if (event.target.id === 'subcategory-create' || event.target.id === 'subcategory-select') {
            setSubcategory(event.target.value);
        }
    }

    return (
        <div>
            <h2 aria-label="Sub Category">Subcategory</h2>

            <section>
                <section className="subsection"> 
                    <div>
                        <input 
                            aria-label={"Use previous sub category? This checkbox switches the add new sub category text input out for a select input that contains sub categories used in previous to-do s. " + (previousSubcategories.length === 0 ? 'No previous sub categories have been created yet' : '')} 
                            aria-disabled={previousSubcategories.length === 0}
                            disabled={previousSubcategories.length === 0}
                            type="checkbox" 
                            id="subcategory-create-checked" 
                            name="subcategory-create-checked" 
                            checked={isPreviousSubcategoriesChecked} 
                            onChange={() => (setIsPreviousSubcategoriesChecked(!isPreviousSubcategoriesChecked), setSubcategory(''))}
                        />
                        <label aria-hidden="true" htmlFor="subcategory-create-checked">Use Previous Subcategory</label>
                    </div>                       
                </section>

                {
                    isPreviousSubcategoriesChecked
                    ?
                    <section className="subsection">
                        <div>
                            <select 
                                aria-label="Select from previous sub categories" 
                                id="subcategory-select" 
                                name="subcategory-select" 
                                onChange={handleChange} value={subcategory}
                            >
                                {
                                    previousSubcategories?.map((singleSubcategory, index) => {
                                        return (
                                            <option aria-label={'Sub Category ' + (parseInt(index)) + ': ' + singleSubcategory} key={singleSubcategory} value={singleSubcategory}>{singleSubcategory}</option>
                                        )
                                    })
                                }
                                <option aria-label="Sub Category: None" value=''>None</option>
                            </select>

                            <label aria-hidden="true" htmlFor="subcategory-select">Choose from Previous Subcategories</label>
                        </div>
                    </section>
                    :
                    <section className="subsection">
                        <div>
                            <input aria-label="Create New Sub Category" type="text" id="subcategory-create" name="subcategory-create" value={subcategory} onChange={handleChange}/>
                            <label aria-hidden="true" htmlFor="subcategory-create">Create New Subcategory</label>
                        </div>
                    </section>
                }
            </section>
        </div>
    )
}