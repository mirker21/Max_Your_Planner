export default function FormSubcategory({subcategory, setSubcategory, handleChange}) {
    return (
        <div>
            <h2>Subcategory</h2>

            <section>
                <section className="subsection">
                    <div>
                        <select id="subcategory-select" name="subcategory-select" onChange={handleChange}>
                            {/* {
                                subcategories?.map((subcategory, index) => {
                                    return (
                                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                                    )
                                })
                            } */}
                        </select>

                        <label htmlFor="subcategory-select">Choose from Previous Categories</label>
                    </div>
                </section>

                <section className="subsection">
                    <div>
                        <input type="text" id="subcategory-create" name="subcategory-create" value={subcategory} onChange={handleChange}/>
                        <label htmlFor="subcategory-create">Create New Subcategory</label>
                    </div>
                </section>
            </section>
        </div>
    )
}