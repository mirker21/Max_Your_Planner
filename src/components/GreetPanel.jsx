import { Html } from "@react-three/drei"
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GreetPanel({topPosition, currentPanel, isViewNarrow}) {

    const fullPanelRef = useRef(null);

    useFrame((delta) => {
        if (fullPanelRef.current !== null) {
            fullPanelRef.current.style.opacity = lerp(fullPanelRef.current.style.opacity, currentPanel === "" ? 1 : 0, 0.1);
        }
    })

    return (
        <Html ref={fullPanelRef} scale={isViewNarrow ? [.013, .013, .013] : [.006, .006, .006]} className="dialog-container greet-dialog-container" position={topPosition} transform sprite>
            <div id="greet-text">
                <h4>Hello!</h4> I am a beaver and my name is <span>Maxwell</span>! <br/> I can help plan your routines and tasks, <br /> and organize them into categories, <br /> complete with specified reminder times!
            </div>
        </Html>
    )
}