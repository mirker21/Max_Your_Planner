export default function Interface({
    isSoundOn,
    setIsSoundOn,
    isMusicOn,
    setIsMusicOn,
    birdsAudio,
    musicAudio,
    setCurrentPanel,
    setCurrentAnimation
}) {

    function handleSoundsAndMusicChange(event) {
        if (event.target.id === 'sound-button') {
            if (isSoundOn === true) {
                birdsAudio.pause()
            } else {
                birdsAudio.play()
            }
            setIsSoundOn(!isSoundOn)
        } else if (event.target.id === 'music-button') {
            if (isMusicOn === true) {
                musicAudio.pause()
            } else {
                musicAudio.play()
            }
            setIsMusicOn(!isMusicOn)
        }
    }

    return (
        <nav id="interface" role="navigation">
            <button aria-label={isSoundOn === true ? "Sounds ON" : "Sounds OFF"} type="button" className="interface-button" id="sound-button" onClick={handleSoundsAndMusicChange}>
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>

                <span aria-hidden="true" className="button-text">Sounds {isSoundOn === true ? "ON" : "OFF"}</span>
            </button>

            <button aria-label={isMusicOn === true ? "Music ON" : "Music OFF"} type="button" className="interface-button" id="music-button" onClick={handleSoundsAndMusicChange}>
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>

                <span aria-hidden="true" className="button-text">Music {isMusicOn === true ? "ON" : "OFF"}</span>
            </button>

            <button aria-label="Open Review Today's Checklist Panel" type="button" className="interface-button" onClick={() => (setCurrentPanel('todays-todos'), setCurrentAnimation('Reading'))}>
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>

                <span aria-hidden="true" className="button-text">Review Today's Checklist</span>
            </button>

            <button aria-label="Open Search To-do s Panel" type="button" className="interface-button" onClick={() => (setCurrentPanel('search-todos'), setCurrentAnimation('Searching'))}>
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <span aria-hidden="true" className="button-text">Search Todos</span>
            </button>

            <button aria-label="Open Add New To-do Panel" type="button" className="interface-button" onClick={() => (setCurrentPanel('add-new-todo'), setCurrentAnimation('Writing'))}>
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <span aria-hidden="true" className="button-text">Add New Todo</span>
            </button>
        </nav>
    )
}