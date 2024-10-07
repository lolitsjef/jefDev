import { useEffect, useRef } from "react"

const Canvas = props => {
    const ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        context.fillstyle = 'red';
        context.fillRect(750,390, 10, 10);
    }, [])


    return <canvas ref = {ref} {...props}/>
}

export default Canvas