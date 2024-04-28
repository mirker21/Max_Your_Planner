export default function FormReminderFrequencySwitch({
    isDatePattern, 
    setIsDatePattern, 
    setDatesTimes
}) {
    return (
        <>
            <h2 id="reminder-frequency-switch-header">Reminder Frequency 
            (
            <p className={isDatePattern === false ? "underlined-reminder-frequency-option" : ""}>
                Specified
            </p>
            /
            <p className={isDatePattern === true ? "underlined-reminder-frequency-option" : ""}>
                Pattern
            </p>
            )
            </h2>

            <div id="reminder-frequency-option-container">
                <div className="reminder-frequency-option">
                    <input 
                        type="checkbox" id="specific-date-checked" 
                        onChange={() => (
                            setDatesTimes([]), 
                            setIsDatePattern(!isDatePattern)
                        )} 
                        checked={isDatePattern === false} 
                    />
                    <label htmlFor="specific-date-checked">
                        <p className={isDatePattern === false ? "underlined-reminder-frequency-option" : ""}>Specified</p>
                    </label>
                </div>
                
                <div className="reminder-frequency-option">
                    <input 
                        type="checkbox" 
                        id="date-pattern-checked" 
                        onChange={() => (
                            setDatesTimes([]), 
                            setIsDatePattern(!isDatePattern)
                        )} 
                        checked={isDatePattern === true} 
                    />
                    <label htmlFor="date-pattern-checked">
                        <p className={isDatePattern === true ? "underlined-reminder-frequency-option" : ""}>Pattern</p>
                    </label>
                </div>
            </div>
        </>
    )
}