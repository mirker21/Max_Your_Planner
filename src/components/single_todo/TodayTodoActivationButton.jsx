export default function TodayTodoActivationButton({todoId, deactivatedTodaysTodos, handleDeactivateTodaysTodo, isDeactivateModalVisible, setIsDeactivateModalVisible}) {
    return (
        <section className={`list-item single-today-todo-deactivate-container ${isDeactivateModalVisible === true ? 'vertical': ''}`}>
            <button type="button" className="single-todo-button" onClick={() => setIsDeactivateModalVisible(!isDeactivateModalVisible)} disabled={isDeactivateModalVisible === true}>
                {
                    deactivatedTodaysTodos.includes(todoId)
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                }

                <span className="button-text">{deactivatedTodaysTodos.includes(todoId) ? 'Activate' : 'Deactivate'} Notification for Today</span>
            </button>                
        
            {
                isDeactivateModalVisible === true
                ?
                <section className="deactivate-today-todo-modal">
                    <p>Deactivate Today's Todo?</p>
                    <button type="button" className="yes-button" onClick={() => (handleDeactivateTodaysTodo(todoId), setIsDeactivateModalVisible(!isDeactivateModalVisible))}>Yes</button>
                    <button type="button" className="no-button" onClick={() => setIsDeactivateModalVisible(!isDeactivateModalVisible)}>No</button>
                </section>
                :
                <></>
            }
        </section>
    )
}