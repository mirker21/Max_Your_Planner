import { A11y } from "@react-three/a11y";

export default function ClosePanelButton({currentPanel, setCurrentPanel, setCurrentAnimation}) {
    return (
        <button aria-label={`Close ${currentPanel} Panel`} type="button" className="close-panel-button" onClick={() => (setCurrentPanel(''), setCurrentAnimation('Idle'))}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>   
    )
}