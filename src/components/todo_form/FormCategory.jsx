export default function FormCategory({previousCategories, category, setCategory}) {
    function handleChange(event) {
        if (event.target.id === 'category-create' || event.target.id === 'category-select') {
            setCategory(event.target.value);
        }
    }

    return (
        <div>                
            <h2>Category</h2>

            <section>
                <section className="subsection">
                    <div>
                        <select id="category-select" name="category-select" onChange={handleChange} value={category}>
                            {
                                previousCategories?.map(singleCategory => {
                                    return (
                                        <option key={singleCategory} value={singleCategory}>{singleCategory}</option>
                                    )
                                })
                            }
                            <option value=''>None</option>
                        </select>
                        
                        <label htmlFor="category-select">Choose from Previous Categories</label>
                    </div>
                </section>

                <section className="subsection">                        
                    <div>
                        <input type="text" id="category-create" name="category-create" value={category} onChange={handleChange}/>
                        <label htmlFor="category-create">Create New Category</label>
                    </div>
                </section>
            </section>
        </div>
    )
}