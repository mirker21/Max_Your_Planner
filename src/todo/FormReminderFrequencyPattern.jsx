import { useState } from "react";
import FormReminderFrequencyPatternTimes from "./FormReminderFrequencyPatternTimes";
import FormReminderFrequencyPatternDays from "./FormReminderFrequencyPatternDays";
import FormReminderFrequencyPatternMonths from "./FormReminderFrequencyPatternMonths";
import FormReminderFrequencyPatternYears from "./FormReminderFrequencyPatternYears";

export default function FormReminderFrequencyPattern({currentYear, setDatesTimes}) {
    const [days, setDays] = useState([]);
    const [dayEquation, setDayEquation] = useState(
        {
            first: '',
            second: ''
        }
    )
    const [isEveryDayOfWeekEachMonth, setIsEveryDayOfWeekEachMonth] = useState(true)
    const [everyNthDayOfWeekEachMonth, setEveryNthDayOfWeekEachMonth] = useState('')

    const [months, setMonths] = useState([]);
    const [monthEquation, setMonthEquation] = useState(
        {
            first: '',
            second: ''
        }
    )
    const [isEveryMonthOfYear, setIsEveryMonthOfYear] = useState(true)

    const [year, setYear] = useState('');
    const [years, setYears] = useState([]);
    const [yearEquation, setYearEquation] = useState(
        {
            first: '',
            second: ''
        }
    );
    const [isEveryYear, setIsEveryYear] = useState(true);
    const [yearRange, setYearRange] = useState(
        {
            start: '',
            end: ''
        }
    );

    const [time, setTime] = useState('');
    const [times, setTimes] = useState([]);
    const [allDay, setAllDay] = useState(true);

    function handleConfirmPattern() {
        setDatesTimes([
            {
                times: times.length > 0 ? [...times] : 'All-Day',
                day: {
                    days: [...days],
                    dayEquation: dayEquation,
                    isEveryDayOfWeekEachMonth: isEveryDayOfWeekEachMonth,
                    everyNthDayOfWeekEachMonth: everyNthDayOfWeekEachMonth,
                },
                month: {
                    months: [...months],
                    monthEquation: monthEquation,
                    isEveryMonthOfYear: isEveryMonthOfYear
                },
                year: {
                    years: [...years],
                    yearEquation: yearEquation,
                    isEveryYear: isEveryYear,
                    yearRange: yearRange
                }
            }
        ])
    }

    let numberSuffix = '';
    if (everyNthDayOfWeekEachMonth === '') {
        numberSuffix = 'th';
    } else if (everyNthDayOfWeekEachMonth.length >= 1) {
        let lastNum = everyNthDayOfWeekEachMonth[everyNthDayOfWeekEachMonth.length - 1];
        switch (lastNum) {
            case '0':
                numberSuffix = 'th';
                break;
            case '1':
                numberSuffix = 'st';
                break;
            case '2':
                numberSuffix = 'nd';
                break;
            case '3':
                numberSuffix = 'rd';
                break;
            case '4':
                numberSuffix = 'th';
                break;
            case '5':
                numberSuffix = 'th';
                break;
            case '6':
                numberSuffix = 'th';
                break;
            case '7':
                numberSuffix = 'th';
                break;
            case '8':
                numberSuffix = 'th';
                break;
            case '9':
                numberSuffix = 'th';
                break;
        }
    }

    let patternDisplayTimes = '';
    let timesFilled = false;

    if (times.length > 0) {
        timesFilled = true;
        let adjustedTimes = times.map(time => {
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
            return displayedTime;
        })
        patternDisplayTimes += adjustedTimes.join(', ')
    } else if (allDay === true) {
        timesFilled = true;
        patternDisplayTimes += 'All-Day'
    }

    let patternDisplayDays = '';
    let daysFilled = false;

    if (isEveryDayOfWeekEachMonth === true) {
        daysFilled = true;
        patternDisplayDays += 
        `Pattern: ${isEveryDayOfWeekEachMonth === true && 'Every '}` 
        + 
        `${days.length > 0 ? days.join(', ') : ' Day'}`
    } else if (everyNthDayOfWeekEachMonth.length > 0) {
        daysFilled = true;
        patternDisplayDays += 
        `Pattern: ${everyNthDayOfWeekEachMonth.length > 0 && 'Every '}` 
        + 
        `${everyNthDayOfWeekEachMonth + numberSuffix}`
        +
        ` ${days.join(', ')} each month`
    } else if (dayEquation.first.length > 0 || dayEquation.second.length > 0) {
        daysFilled = true;
        patternDisplayDays += `Pattern: Every 
        ${dayEquation.first === '1' ? '' : dayEquation.first}
        n  +    
        ${dayEquation.second === '' ? '0' : dayEquation.second}
        ` 
        + 
        ` day${'s'}`
    }

    let patternDisplayMonths = '';
    let monthsFilled = false;

    if (isEveryMonthOfYear === true) {
        monthsFilled = true;
        patternDisplayMonths += 
        `Pattern: ${isEveryMonthOfYear === true && 'Every '}` 
        + 
        `${months.length > 0 ? ' ' + months.join(', ') : 'Month'}`
    } else if (monthEquation.first.length > 0 || monthEquation.second.length > 0) {
        monthsFilled = true;
        patternDisplayMonths += `Pattern: Every
        ${monthEquation.first === '1' ? '' : monthEquation.first}n
        +    
        ${monthEquation.second === '' ? '0' : monthEquation.second}
        ` 
        + 
        ` month${'s'}`
    }

    let patternDisplayYears = '';
    let yearsFilled = false;

    if (isEveryYear === true) {
        yearsFilled = true;
        patternDisplayYears += 
        `Pattern: ${isEveryYear === true && 'Every '}` 
        + 
        `${years.length > 1 ? years.join(', ') : 'Year'}`
    } else if (years.length > 0) {
        yearsFilled = true;
        patternDisplayYears += `Pattern: 
        ${years.join(', ')}
        `
    } else if (yearRange.start.length > 0 || yearRange.end.length > 0) {
        yearsFilled = true;
        patternDisplayYears += `Range:  
        ${yearRange.start === '1' ? '' : yearRange.start}
        -    
        ${yearRange.end === '' ? '0' : yearRange.end}
        ` 
    } else if (yearEquation.first.length > 0 || yearEquation.second.length > 0) {
        yearsFilled = true;
        patternDisplayYears += `Pattern: Every 
        ${yearEquation.first === '1' ? '' : yearEquation.first}
        n  +    
        ${yearEquation.second === '' ? '0' : yearEquation.second}
        ` 
        + 
        ` year${'s'}`
    }

    let patternDisplay = {
        default: 
        allDay === true
        && isEveryDayOfWeekEachMonth === true 
        && isEveryMonthOfYear === true 
        && isEveryYear === true ? true : false,
        times: patternDisplayTimes,
        days:  patternDisplayDays,
        months: patternDisplayMonths,
        years: patternDisplayYears
    }

    return (
        <section>
            <FormReminderFrequencyPatternTimes 
                time={time}
                setTime={setTime}
                times={times}
                setTimes={setTimes}
                allDay={allDay}
                setAllDay={setAllDay}
            />

            <FormReminderFrequencyPatternDays
                days={days}
                setDays={setDays}
                dayEquation={dayEquation}
                setDayEquation={setDayEquation}
                isEveryDayOfWeekEachMonth={isEveryDayOfWeekEachMonth}
                setIsEveryDayOfWeekEachMonth={setIsEveryDayOfWeekEachMonth}
                everyNthDayOfWeekEachMonth={everyNthDayOfWeekEachMonth}
                setEveryNthDayOfWeekEachMonth={setEveryNthDayOfWeekEachMonth}
                numberSuffix={numberSuffix}
            />

            <FormReminderFrequencyPatternMonths
                months={months}
                setMonths={setMonths}
                monthEquation={monthEquation}
                setMonthEquation={setMonthEquation}
                isEveryMonthOfYear={isEveryMonthOfYear}
                setIsEveryMonthOfYear={setIsEveryMonthOfYear}
            />
            
            <FormReminderFrequencyPatternYears
                year={year}
                setYear={setYear}
                years={years}
                setYears={setYears}
                yearEquation={yearEquation}
                setYearEquation={setYearEquation}
                isEveryYear={isEveryYear}
                setIsEveryYear={setIsEveryYear}
                yearRange={yearRange}
                setYearRange={setYearRange}
                currentYear={currentYear}
            />

            <hr />

            <div id="pattern-reminder">
                <h4>Pattern: {patternDisplay.default === true ? 'Default' : 'Custom'}</h4>
                <ul>
                    <li>Times: {patternDisplay.times}</li>
                    <li>Days: {patternDisplay.days}</li>
                    <li>Months: {patternDisplay.months}</li>
                    <li>Years: {patternDisplay.years}</li>
                </ul>
            </div>

            {
                timesFilled && daysFilled && monthsFilled && yearsFilled
                &&
                <button type="button" id="confirm-pattern-button" onClick={handleConfirmPattern}>Confirm Pattern Updates</button>
            }
        </section>
    )
}