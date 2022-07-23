import ReactDOM from "react-dom";
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from "react";

const App = () => {
    const ref = useRef<any>()
    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true, 
            wasmURL: '/esbuild.wasm'
        })
    }

    useEffect(() => {
      startService()
    }, [])
    

    const onClick = async () => {
        if (!ref.current) {
            return
        }

        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        })
        setCode(result.code)
    }

    return <div>
        <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)