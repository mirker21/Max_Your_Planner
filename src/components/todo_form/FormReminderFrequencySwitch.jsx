export default function FormReminderFrequencySwitch({
    isDatePattern, 
    setIsDatePattern, 
    setDatesTimes
}) {
    return (
        <>
            <h2 aria-label={'Reminder Frequency Currently Set To: ' + (isDatePattern ? 'Pattern' : 'Specified')} id="reminder-frequency-switch-header">Reminder Frequency 
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
                        aria-label="Set Reminder Frequency to Specified"
                        type="checkbox" 
                        id="specific-date-checked" 
                        onChange={() => (
                            setDatesTimes([]), 
                            setIsDatePattern(!isDatePattern)
                        )} 
                        checked={isDatePattern === false} 
                    />
                    <label aria-hidden="true" htmlFor="specific-date-checked">
                        <p className={isDatePattern === false ? "underlined-reminder-frequency-option" : ""}>Specified</p>
                    </label>
                </div>
                
                <div className="reminder-frequency-option">
                    <input 
                        aria-label="Set Reminder Frequency to Pattern"
                        type="checkbox" 
                        id="date-pattern-checked" 
                        onChange={() => (
                            setDatesTimes([]), 
                            setIsDatePattern(!isDatePattern)
                        )} 
                        checked={isDatePattern === true} 
                    />
                    <label aria-hidden="true" htmlFor="date-pattern-checked">
                        <p className={isDatePattern === true ? "underlined-reminder-frequency-option" : ""}>Pattern</p>
                    </label>
                </div>
            </div>
        </>
    )
}