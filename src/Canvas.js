import { useEffect, useRef } from "react"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Canvas = props => {
    const {draw, ...rest} = props;
    const ref = useRef();

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        let count = 0;
        let animationID;

        const renderer = async () => {
           count++;
           draw(context, count);
           await sleep(100);
           animationID = window.requestAnimationFrame(renderer);
        }
        renderer()
        return () => window.cancelAnimationFrame(animationID);
    }, [draw])


    return <canvas ref = {ref} {...rest}/>
}

export default Canvas