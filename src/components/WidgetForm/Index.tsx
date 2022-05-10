import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugUrl from '../../assets/bug.svg'
import ideaUrl from '../../assets/idea.svg'
import thoughtUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from "../Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "../Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "../Steps/FeedbackSucessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugUrl,
            alt: "Imagem de um inseto"
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaUrl,
            alt: "Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtUrl,
            alt: "Imagem de uma nuvem"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedBack() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSucessStep onFeedbackRestartRequest={handleRestartFeedBack} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeForm={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep feedbackType={feedbackType}
                            onFeedbackRestartRequest={handleRestartFeedBack}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />

                    )}
                </>
            )}
            <p>Por aí...</p>
            <footer className="text-xs text-neutral-400 ">
                Feito pelo <a className="underline underline-offset-2" href="https://github.com/alezzott">Alezzott</a>
            </footer>
        </div >
    )
}