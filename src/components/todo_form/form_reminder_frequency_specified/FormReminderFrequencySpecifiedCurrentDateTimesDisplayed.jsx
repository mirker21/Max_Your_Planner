export default function FormReminderFrequencySpecifiedCurrentDateTimesDisplayed({date, times, removeTime}) {
    return (
        <>
            {
                times.length > 0
                &&
                <div className="result">
                    <hr aria-hidden="true" />

                    <h3 aria-hidden="true">Times for {date}</h3>

                    <ul className="pattern-times-list" aria-label={'Times added to current date ' + date}>
                        {
                            times.map((time, index) => {
                                let meridian = 'AM';
                                let [hour, minute] = time.split(':');

                                if (hour <= 11) {
                                    if (hour[0] === '0') {
                                        hour = hour.slice(1,);
                                    }
                                } else {
                                    if (hour > 12) {
                                        hour = hour - 12;
                                    }
                                    meridian = 'PM';
                                }

                                let displayedTime = hour + ':' + minute + ' ' + meridian;

                                return (    
                                    <li className="list-item" key={time + index} id={time + index}>
                                        <button 
                                            aria-label={'Remove ' + time + ' from ' + date}
                                            type="button" 
                                            className="remove-time-button" 
                                            onClick={removeTime}
                                        >
                                            ×
                                        </button>
                                        <p aria-hidden="true">{displayedTime}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </>
    )
}