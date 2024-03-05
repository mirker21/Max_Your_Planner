export default function FormReminderFrequencySwitch({isDatePattern, setIsDatePattern}) {
    return (
        <>
            <h2>Reminder Frequency (Specified/Pattern)</h2>

            <div id="reminder-frequency-option-container">
                <div className="reminder-frequency-option">
                    <input type="checkbox" id="specific-date-checked" onChange={() => setIsDatePattern(!isDatePattern)} checked={isDatePattern === false} />
                    <label htmlFor="specific-date-checked">
                        <p>Specified</p>
                    </label>
                </div>
                
                <div className="reminder-frequency-option">
                    <input type="checkbox" id="date-pattern-checked" onChange={() => setIsDatePattern(!isDatePattern)} checked={isDatePattern === true} />
                    <label htmlFor="date-pattern-checked">
                        <p>Pattern</p>
                    </label>
                </div>
            </div>
        </>
    )
}