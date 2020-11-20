import { h, render } from "preact"
import App from "./containers/App"
import "./styles/index.css"

const root = document.getElementById("root") as HTMLElement

render(<App />, root)
