export default function Interface({
    isSoundOn,
    setIsSoundOn,
    isMusicOn,
    setIsMusicOn,
    birdsAudio,
    musicAudio,
    currentPanel,
    setCurrentPanel,
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

    console.log('INTERFACE!')

    function handlePanelChange(event) {

    }

    return (
        <article id="interface">
            <button type="button" className="interface-button" id="sound-button" onClick={handleSoundsAndMusicChange}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
                <span className="button-text">Sounds {isSoundOn === true ? "ON" : "OFF"}</span>
            </button>

            <button type="button" className="interface-button" id="music-button" onClick={handleSoundsAndMusicChange}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>

                <span className="button-text">Music {isMusicOn === true ? "ON" : "OFF"}</span>
            </button>

            <button type="button" className="interface-button" onClick={() => setCurrentPanel('search-todos')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <span className="button-text">Search Todos</span>
            </button>

            <button type="button" className="interface-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>

                <span className="button-text">Read Todos</span>
            </button>

            <button type="button" className="interface-button" onClick={() => setCurrentPanel('add-new-todo')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <span className="button-text">Add New Todo</span>
            </button>
        </article>
    )
}