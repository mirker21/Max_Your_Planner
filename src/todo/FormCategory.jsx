export default function FormCategory({category, setCategory, handleChange}) {
    return (
        <div>                
            <h2>Category</h2>

            <section>
                <section className="subsection">
                    <div>
                        <select id="category-select" name="category-select" onChange={handleChange}>
                            {/* {
                                categories?.map((category, index) => {
                                    <option key={category} value={category}>{category}</option>
                                })
                            } */}
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