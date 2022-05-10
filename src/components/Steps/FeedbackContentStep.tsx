import { CloseButton } from "../CloseButton";
import { FeedbackType, feedbackTypes } from "../WidgetForm/Index";
import { ArrowLeft, Camera } from 'phosphor-react'
import { ScreenshotButton } from "../WidgetForm/ScreenshotButton";
import { FormEvent, useState } from "react";
import { api } from "../../utils/api";
import { LoadingButton } from "../LoadingButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequest: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep({ feedbackType,
    onFeedbackRestartRequest, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenShot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, seIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        seIsSendingFeedback(true)

        // console.log({
        //     screenshot,
        //     comment
        // })
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })

        seIsSendingFeedback(false)
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequest}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}</span>
                <CloseButton />
            </header>
            <form
                className="my-4 w-full"
                onSubmit={handleSubmitFeedback}
            >
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="O que está acontecendo"
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        OnScreenShotTake={setScreenShot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 justify-center itens-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <LoadingButton /> : 'Enviar'}
                    </button>
                </footer>
            </form>
        </>
    )


}