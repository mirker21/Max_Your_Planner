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
            <h2>Subcategory</h2>

            <section>
                <section className="subsection"> 
                    <div>
                        <input type="checkbox" id="subcategory-create-checked" name="subcategory-create-checked" checked={isPreviousSubcategoriesChecked} onChange={() => (setIsPreviousSubcategoriesChecked(!isPreviousSubcategoriesChecked), setSubcategory(''))}/>
                        <label htmlFor="subcategory-create-checked">Use Previous Subcategory</label>
                    </div>                       
                </section>

                {
                    isPreviousSubcategoriesChecked
                    ?
                    <section className="subsection">
                        <div>
                            <select id="subcategory-select" name="subcategory-select" onChange={handleChange} value={subcategory}>
                                {
                                    previousSubcategories?.map(singleSubcategory => {
                                        return (
                                            <option key={singleSubcategory} value={singleSubcategory}>{singleSubcategory}</option>
                                        )
                                    })
                                }
                                <option value=''>None</option>
                            </select>

                            <label htmlFor="subcategory-select">Choose from Previous Subcategories</label>
                        </div>
                    </section>
                    :
                    <section className="subsection">
                        <div>
                            <input type="text" id="subcategory-create" name="subcategory-create" value={subcategory} onChange={handleChange}/>
                            <label htmlFor="subcategory-create">Create New Subcategory</label>
                        </div>
                    </section>
                }
            </section>
        </div>
    )
}