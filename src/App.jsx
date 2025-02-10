import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./index.css";

function App() {
    const [text, setText] = useState("");
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [logo, setLogo] = useState(null);
    const [format, setFormat] = useState("png"); // Estado para el formato
    const qrRef = useRef();

    // Subir logo
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Descargar QR en formato seleccionado
    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;

        const url = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-code.${format}`;
        link.click();
    };

    // Compartir en redes sociales
    const shareOnWhatsApp = () => {
        const url = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        const url = encodeURIComponent(text);
        window.open(`https://twitter.com/intent/tweet?text=${url}`, "_blank");
    };

    const shareOnFacebook = () => {
        const url = encodeURIComponent(text);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    return (
        <div className="container">
            <h1>Generador de Código QR</h1>

            <input
                type="text"
                placeholder="Escribe algo..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="color-picker">
                <label>Color QR:</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />

                <label>Fondo QR:</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>

            <div className="logo-upload">
                <label>Subir Logo:</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>

            {/* Selector de formato */}
            <div>
                <label>Formato:</label>
                <select onChange={(e) => setFormat(e.target.value)} value={format}>
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                </select>
            </div>

            <br />
            <button onClick={downloadQRCode} disabled={!text}>Descargar QR</button>

            <br />
            {text && (
                <div ref={qrRef} className="qr-container">
                    <QRCodeCanvas value={text} size={200} fgColor={fgColor} bgColor={bgColor} />
                    {logo && <img src={logo} alt="Logo" className="qr-logo" />}
                </div>
            )}

            {/* Botones para compartir */}
            <div className="share-buttons">
                <button className="whatsapp" onClick={shareOnWhatsApp}>Compartir en WhatsApp</button>
                <button className="twitter" onClick={shareOnTwitter}>Compartir en Twitter</button>
                <button className="facebook" onClick={shareOnFacebook}>Compartir en Facebook</button>
            </div>
        </div>
    );
}

export default App;






 

