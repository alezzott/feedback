import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { LoadingButton } from "../LoadingButton";

interface ScreenShotProps {
    screenshot: string | null;
    OnScreenShotTake: (screenshot: string | null) => void;
}


export function ScreenshotButton({ screenshot, OnScreenShotTake }: ScreenShotProps) {
    const [isTakeScreenshot, setIsTakeScreenshot] = useState(false)


    async function handleTakeScreenshot() {
        setIsTakeScreenshot(true)

        const take = await html2canvas(document.querySelector('html')!)
        const base64Image = take.toDataURL('image/png');

        OnScreenShotTake(base64Image);
        setIsTakeScreenshot(false);
    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 round-md border-transparent flex justify-end itens-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => OnScreenShotTake(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 100
                }}
            >

                <Trash weight="fill" />
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {isTakeScreenshot ? <LoadingButton /> : <Camera className="w-6 h-6" />}
        </button>
    )
}