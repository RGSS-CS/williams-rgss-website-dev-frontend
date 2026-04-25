import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div className="content">

            <div className="gif-stage">
                <div className="overlay-404">
                    <div className="num-404">4<span>0</span>4</div>
                </div>
                <div className="gif-frame">
                    <img src="/image/gifs/meowl.gif" alt="meow"></img>
                </div>
            </div>

            <div className="copy">
                <h1>😨</h1>
                <p>The page you're looking for doesn't exist or may have been moved. Head back to safety.</p>
            </div>

            <div className="actions">
                <a href="/" className="btn-home">
                    <i className="fa-solid fa-house"></i>
                    Go to Home
                </a>
                <a href="javascript:history.back()" className="btn-back">
                    <i className="fa-solid fa-arrow-left"></i>
                    Go Back
                </a>
            </div>

        </div>
    )
}