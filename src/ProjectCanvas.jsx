import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, Clouds, Cloud, Html } from "@react-three/drei";
import Scenery from "./components/Scenery";
import Maxwell from './components/Maxwell_the_beaver_final'
import FormDisplay from "./components/FormDisplay";
import FormPanels from "./FormPanels";
import SearchPanels from "./SearchPanels";

import { FullFormPanel } from "./todo/TodoForm";
import SearchTodos from "./components/SearchTodos";

export default function ProjectCanvas({todos, setTodos, currentPanel, setCurrentPanel}) {
    const logRef = useRef(null)
    const logFocusRef = useRef(null)

    return (
        <Canvas id="three-canvas" linear shadows>
            {/* position={[-5, 1, -20]} rotation={[Math.PI*2, Math.PI, Math.PI*2]} */}
            <PerspectiveCamera makeDefault fov={60} near={.01} far={1000} position={[.9, .03, -.3]} rotation={[.02, 2, -.02]} />
            {/* <OrbitControls /> */}
            <ambientLight intensity={3} color="#ffefdd" />
            <directionalLight position={[0, 5, 10]} intensity={3} color="#fbffe0" />
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud seed={6} segments={15} bounds={[40, 5, 40]} volume={25} color="white" position={[-.55, .6, 0]} scale={[.03, .03, .03]} opacity={5} />
                <Cloud seed={8} segments={15} bounds={[45, 5, 45]} volume={20} color="white" position={[-.55, .63, 0]} scale={[.04, .04, .04]} opacity={5} />
                {/* <Cloud seed={1} segments={40} bounds={[2, 2, 2]} volume={3} color="white" position={[5, 3, 0]} /> */}
                {/* <Cloud seed={2} segments={40} bounds={[2, 2, 2]} volume={3} color="white" position={[10, 3, 0]} /> */}
            </Clouds>
            <Scenery logRef={logRef} />
            <Content todos={todos} setTodos={setTodos} currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} />
            <mesh ref={logFocusRef} position={[-1.61, .21, -.51]}>
                <boxGeometry args={[.05, .05, .05]} />
                <meshBasicMaterial color={0xff0000} />
            </mesh>
            <color args={ [ '#11eeFF' ] } attach="background" />
        </Canvas>
    )
}

function Content({todos, setTodos, currentPanel, setCurrentPanel}) {
    const [selectedTodo, setSelectedTodo] = useState('')
    const [currentAnimation, setCurrentAnimation] = ('')

    function handleSubmitTodoEntry(event) {
        event.preventDefault();
        const newTodos = [...todos];
        const newTodo = {
            id: generateUUID(),
            category: category,
            subcategory: subcategory,
            reminderFrequency: [...datesTimes],
            checklist: [...checklist]
        };
        newTodos.push(newTodo);
        setTodos([...newTodos]);
        console.log('submitted!', newTodos)
    }
    // function add item to list

    const previousCategories = [...new Set(todos.map(todo => {
        return todo.category;
    }))]

    const previousSubcategories = [...new Set(todos.map(todo => {
        return todo.subcategory;
    }))]

    const { viewport, size } = useThree()
    console.log('PROJECT CANVAS!')
    console.log(viewport)
    console.log(size)
    const isWide = size.width > 2200;

    let displayedPanel = '';

    let leftPosition = [.85, .04, size.width/100000 - .22];
    let rightPosition = [.795, .04, -size.width/100000 -.302];
    let topPosition = [.82, .07, -.261]
    let formScale=[.005, .005, .005]

    console.log(leftPosition)
    console.log(rightPosition)

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
                setCurrentPanel={setCurrentPanel}
                leftPosition={leftPosition}
                rightPosition={rightPosition}
                topPosition={topPosition}
            />
        )
    }
    
    if (displayedPanel === '') {
        displayedPanel = (
            <Html scale={[.75, .75, .75]} className="dialog-container" position={[-7, .04, size.width/100000 + 13]} transform sprite>
                <p>
                    Hello, I am a beaver and my name is Maxwell! <br/> I can help plan your routines and tasks, then provide reminders!
                </p>
            </Html>
        )
    }

    return (
        <Suspense fallback={null}>
            <Maxwell scale={[.01, .01, .01]} position={[.78, -.01, -.241]} rotation={[0, -Math.PI/2 + Math.PI * Math.PI, 0]} />
            {displayedPanel}
        </Suspense>
    )
}