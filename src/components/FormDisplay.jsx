import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';

export default function FormDisplay({children, previousCategories, previousSubcategories, panels}) {
    // console.log('FORM DISPLAY!', children)
    // let displayId = '';

    // // I want to check if there are any children
    // let panels
    // if (children.length > 0) {
    //     Object.keys(children).map(child => {
    //         console.log('CHILD!', child)
    //         return children[child]
    //     })
    // }

    console.log(children)

    // let panel = '';
    // let leftPanel = '';
    // let rightPanel = '';

    // if (children.length > 1) {
    //     console.log(children)
    //     leftPanel = (
    //         children.leftPanelForm
    //     )
    // } else if (children.length === 1) {
    //     console.log(children)
    //     leftPanel = (
    //         children
    //     )
    // }

    return (
        <>
            <Html position={[.8, .05, -.09]} className={"dialog-container"}>
                <div>
                    {children.length === 1 ? children : <></>}
                    {children.leftPanelForm}
                    {children.fullPanel}
                </div>
            </Html>
            {
                children.hasOwnProperty('rightPanelForm') === true
                && 
                <Html position={[.78, .05, -.3]} className={"dialog-container"}>
                    <div>
                        {children.rightPanelForm}
                    </div>
                </Html>
            }
        </>
    )
}