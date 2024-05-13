export default function FormReminderFrequencySpecifiedAllDateTimesDisplayed({datesTimes, removeDateTime, handleEditDateTime}) {
    return (
        <>
            {
                datesTimes.length > 0
                &&
                <div id="date-times-result">
                    <hr />

                    <h3>All Dates And Times</h3>

                    <div className="pattern-dates-times-list">
                        {
                            datesTimes.map((dateTime, index) => {
                                let timeId = '';
                                if (dateTime.times === 'All-Day') {
                                    timeId = 'All-Day';
                                }

                                return (
                                    <div 
                                        key={dateTime.id + 'main'} 
                                        className="result single-date-times-container" 
                                        id={dateTime.id  + 'main'}
                                    >
                                        <div className="result-date-container">
                                            <button 
                                                type="button" 
                                                className="remove-date-button" 
                                                id={dateTime.id + dateTime.date} 
                                                onClick={removeDateTime}
                                            >
                                                ×
                                            </button>

                                            <input 
                                                type="date" 
                                                className="date-input" 
                                                id={dateTime.id + dateTime.date + index} 
                                                value={dateTime.date}
                                                onChange={handleEditDateTime} 
                                            />
                                        </div>
                                    
                                        <ul className="pattern-times-list">
                                            {
                                                dateTime.times === 'All-Day'
                                                ?
                                                <li 
                                                    className="list-item" 
                                                    key={dateTime.id + timeId} 
                                                    id={dateTime.id + timeId}
                                                >
                                                    <button 
                                                        type="button" 
                                                        className="remove-time-button" 
                                                        id={dateTime.id + timeId} 
                                                        onClick={removeDateTime}
                                                    >
                                                        ×
                                                    </button>

                                                    <p>{dateTime.times}</p>
                                                </li>
                                                :
                                                dateTime.times?.map((time, timeIndex) => {
                                                    timeId = time;

                                                    return (
                                                        <li 
                                                            className="list-item" 
                                                            key={dateTime.id + timeId} 
                                                            id={dateTime.id + timeId}
                                                        >
                                                            <button 
                                                                type="button" 
                                                                className="remove-time-button" 
                                                                id={dateTime.id + timeId} 
                                                                onClick={removeDateTime}
                                                            >
                                                                ×
                                                            </button>

                                                            <input 
                                                                className="time-input" 
                                                                type="time" 
                                                                id={dateTime.id + timeIndex} 
                                                                value={time} 
                                                                onChange={handleEditDateTime} 
                                                            />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}