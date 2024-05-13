import { Html } from "@react-three/drei"
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { A11y } from '@react-three/a11y'
import ClosePanelButton from "./ClosePanelButton";

export default function GreetPanel({
    topPosition, 
    currentPanel, 
    isViewNarrow, 
    setCurrentPanel, 
    setCurrentAnimation
}) {

    const fullPanelRef = useRef(null);

    // Huge thanks to Ask-Alice from https://www.reddit.com/r/threejs/comments/lg54ko/fade_animation_when_changing_views_react_three/ for showing a method to change transparency of element.
    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "Greet" ? 1 : 0, 0.1);
        }
    })

    return (
        <A11y role="content" description="Maxwell's Greeting Panel">
            <Html ref={fullPanelRef} scale={isViewNarrow ? [.013, .013, .013] : [.006, .006, .006]} className="dialog-container greet-dialog-container top-dialog-container" position={topPosition} transform sprite>
                <ClosePanelButton currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setCurrentAnimation={setCurrentAnimation} />
                <div id="greet-text">
                    <h4>Hello!</h4> I am a beaver and my name is <span>Maxwell</span>! <br aria-hidden/> I can help plan your routines and tasks, <br aria-hidden/> and organize them into categories, <br aria-hidden/> complete with specified reminder times!
                </div>
            </Html>
        </A11y>
    )
}