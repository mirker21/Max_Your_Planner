import { useState } from "react";
import FormReminderFrequencyPatternTimes from "./FormReminderFrequencyPatternTimes";
import FormReminderFrequencyPatternDays from "./FormReminderFrequencyPatternDays";
import FormReminderFrequencyPatternMonths from "./FormReminderFrequencyPatternMonths";
import FormReminderFrequencyPatternYears from "./FormReminderFrequencyPatternYears";

export default function ReminderFrequencyPattern({currentYear}) {
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
    const [allDay, setAllDay] = useState(false);

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

    let patternDisplayDays = '';

    if (isEveryDayOfWeekEachMonth === true) {
        patternDisplayDays += 
        `Pattern: ${isEveryDayOfWeekEachMonth === true && 'Every '}` 
        + 
        `${days.length > 0 ? days.join(', ') : ' Day'}`
    } else if (everyNthDayOfWeekEachMonth.length > 0) {
        patternDisplayDays += 
        `Pattern: ${everyNthDayOfWeekEachMonth.length > 0 && 'Every '}` 
        + 
        `${everyNthDayOfWeekEachMonth + numberSuffix}`
        +
        ` ${days.join(', ')} each month`
    } else if (dayEquation.first.length > 0 || dayEquation.second.length > 0) {
        patternDisplayDays += `Pattern: Every 
        ${dayEquation.first === '1' ? '' : dayEquation.first}
        n  +    
        ${dayEquation.second === '' ? '0' : dayEquation.second}
        ` 
        + 
        ` day${'s'}`
    }

    let patternDisplayMonths = '';

    if (isEveryMonthOfYear === true) {
        patternDisplayMonths += 
        `Pattern: ${isEveryMonthOfYear === true && 'Every '}` 
        + 
        `${months.length > 0 ? ' ' + months.join(', ') : 'Month'}`
    } else if (monthEquation.first.length > 0 || monthEquation.second.length > 0) {
        patternDisplayMonths += `Pattern: Every
        ${monthEquation.first === '1' ? '' : monthEquation.first}n
        +    
        ${monthEquation.second === '' ? '0' : monthEquation.second}
        ` 
        + 
        ` month${'s'}`
    }

    let patternDisplayYears = '';

    if (isEveryYear === true) {
        patternDisplayYears += 
        `Pattern: ${isEveryYear === true && 'Every '}` 
        + 
        `${days.length > 1 ? days.join(', ') : 'Year'}`
    } else if (years.length > 0) {
        patternDisplayYears += `Pattern: 
        ${years.join(', ')}
        `
    } else if (yearRange.start.length > 0 || yearRange.end.length > 0) {
        patternDisplayYears += `Range:  
        ${yearRange.start === '1' ? '' : yearRange.start}
        -    
        ${yearRange.end === '' ? '0' : yearRange.end}
        ` 
    } else if (yearEquation.first.length > 0 || yearEquation.second.length > 0) {
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
        isEveryDayOfWeekEachMonth === true 
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
                times={times}
                allDay={allDay}
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
                days={days}
                dayEquation={dayEquation}
                isEveryDayOfWeekEachMonth={isEveryDayOfWeekEachMonth}
                months={months}
                setMonths={setMonths}
                monthEquation={monthEquation}
                setMonthEquation={setMonthEquation}
                isEveryMonthOfYear={isEveryMonthOfYear}
                setIsEveryMonthOfYear={setIsEveryMonthOfYear}
            />
            
            <FormReminderFrequencyPatternYears
                months={months}
                monthEquation={monthEquation}
                isEveryMonthOfYear={isEveryMonthOfYear}
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
                <li>
                    <ul>Times: {patternDisplay.times}</ul>
                    <ul>Days: {patternDisplay.days}</ul>
                    <ul>Months: {patternDisplay.months}</ul>
                    <ul>Years: {patternDisplay.years}</ul>
                </li>
            </div>
        </section>
    )
}