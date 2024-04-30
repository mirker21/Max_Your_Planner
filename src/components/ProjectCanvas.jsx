import { Suspense, useState } from "react";
import * as THREE from 'three';
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Clouds, Cloud } from "@react-three/drei";
import { DepthOfField, EffectComposer, HueSaturation } from "@react-three/postprocessing";
import Scenery from "../3d_components/Scenery";
import Maxwell from '../3d_components/Maxwell'
import GreetPanel from "./GreetPanel";
import FormPanels from "./todo_form/FormPanels";
import SearchPanels from "./SearchPanels";
import TodaysChecklist from "./TodaysChecklist";
import Loading from "./Loading";

export default function ProjectCanvas({
    todos,
    setTodos,
    currentPanel,
    setCurrentPanel,
    deactivatedTodaysTodos,
    setDeactivatedTodaysTodos,
    todaysTodosFiltered,
    currentAnimation,
    setCurrentAnimation
}) {

    return (
        <Suspense fallback={<Loading />}>
            <Canvas id="three-canvas" linear>
                <PerspectiveCamera makeDefault fov={60} near={.01} far={1000} position={[.9, .03, -.299]} rotation={[.02, 2, -.02]} />
                {/* <OrbitControls /> */}
                <ambientLight intensity={3.5} color="#ffefdd" />
                <directionalLight position={[0, 5, 10]} intensity={3} color="#fbffe0" />
                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud seed={6} segments={15} bounds={[40, 5, 40]} volume={25} color="white" position={[-.55, .6, 0]} scale={[.03, .03, .03]} opacity={5} />
                    <Cloud seed={8} segments={15} bounds={[45, 5, 45]} volume={20} color="white" position={[-.55, .63, 0]} scale={[.04, .04, .04]} opacity={5} />
                </Clouds>
                <Scenery />
                <Content 
                    todos={todos} 
                    setTodos={setTodos} 
                    currentPanel={currentPanel} 
                    setCurrentPanel={setCurrentPanel} 
                    deactivatedTodaysTodos={deactivatedTodaysTodos}
                    setDeactivatedTodaysTodos={setDeactivatedTodaysTodos}
                    todaysTodosFiltered={todaysTodosFiltered}
                    currentAnimation={currentAnimation}
                    setCurrentAnimation={setCurrentAnimation}
                />
                <color args={ [ '#11eeFF' ] } attach="background" />
                <EffectComposer>
                    <DepthOfField
                        target={[.78, -.01, -.241]}
                        focusDistance={60} 
                        focalLength={.001} 
                        bokehScale={10}
                    />
                    <HueSaturation saturation={-0.15} />
                </EffectComposer>
            </Canvas>
        </Suspense>
    )
}

function Content({
    todos,
    setTodos,
    currentPanel,
    setCurrentPanel,
    deactivatedTodaysTodos,
    setDeactivatedTodaysTodos,
    todaysTodosFiltered,
    currentAnimation,
    setCurrentAnimation,
}) {
    const [selectedTodo, setSelectedTodo] = useState('')

    const previousCategories = [...new Set(todos.map(todo => {
        return todo.category;
    }))]

    const previousSubcategories = [...new Set(todos.map(todo => {
        return todo.subcategory;
    }))]

    const { size, camera } = useThree()

    const isWide = size.width > 2200;
    const isViewNarrow = size.width < 900;

    if (isViewNarrow === false) {
        camera.position.set(.9, .03, -.299)
        camera.rotation.set(.02, 2, -.02)
    } else {
        camera.position.set(1, .09, -.3435)
        camera.rotation.set(.02, 2, -.02)
    }

    let displayedPanel = '';
    
    let zoomedOut = [.9, .03, -.299];
    let normalZoom = [.9, .03, -.299];

    let leftPosition = [.85, .04, size.width/100000 - .22];
    let rightPosition = [.795, .04, -size.width/100000 -.302];
    let topPositionYValue = isViewNarrow ? .105 : .0565;
    let topPosition = [.82, topPositionYValue, -.261]
    let formScale = isViewNarrow ? [.009, .009, .009] : [.004, .004, .004]

    if (currentPanel === 'add-new-todo' || currentPanel === 'edit-todo') {
        displayedPanel = (
            <FormPanels
                width={size.width}
                isWide={isWide}
                scale={formScale}
                todos={todos}
                setTodos={setTodos}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                previousCategories={previousCategories}
                previousSubcategories={previousSubcategories}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                leftPosition={leftPosition}
                rightPosition={rightPosition}
                topPosition={topPosition}
                setCurrentAnimation={setCurrentAnimation}
            />
        )
    } else if (currentPanel === 'search-todos') {
        displayedPanel = (
            <SearchPanels 
                width={size.width}
                isWide={isWide}
                scale={formScale}
                todos={todos}
                setTodos={setTodos}
                setSelectedTodo={setSelectedTodo}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                leftPosition={leftPosition}
                rightPosition={rightPosition}
                topPosition={topPosition}
                setCurrentAnimation={setCurrentAnimation}
            />
        )
    } else if (currentPanel === 'todays-todos') {
        displayedPanel = (
            <TodaysChecklist 
                todaysTodosFiltered={todaysTodosFiltered}
                deactivatedTodaysTodos={deactivatedTodaysTodos}
                setDeactivatedTodaysTodos={setDeactivatedTodaysTodos}
                isViewNarrow={isViewNarrow}
                isWide={isWide}
                rightPosition={rightPosition}
                topPosition={topPosition}
                currentPanel={currentPanel}
            />
        )
    }
    
    if (displayedPanel === '') {
        displayedPanel = (
            <GreetPanel 
                topPosition={topPosition}
                currentPanel={currentPanel}
                isViewNarrow={isViewNarrow}
            />
        )
    }

    return (
        <>
            <Maxwell 
                scale={[.01, .01, .01]} 
                position={[.78, -.01, -.241]} 
                rotation={[0, -Math.PI/2 + Math.PI * Math.PI, 0]} 
                currentAnimation={currentAnimation}
            />
            {displayedPanel}
        </>
    )
}