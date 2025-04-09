import React, { useEffect, useState, Suspense } from 'react'

interface DelayedFallbackProps {
    children: React.ReactNode;
    fallback: React.ReactNode;
    delayMs?: number;       // fallback 보이기 시작하는 최소 지연 시간
    minDurationMs?: number; // fallback을 최소 유지할 시간
}

const DelayedRouter: React.FC<DelayedFallbackProps> = (
    {
        children,
        fallback,
        delayMs = 300,
        minDurationMs = 1000,
    }) => {

    const [showFallback, setShowFallback] = useState(false)
    const [canRenderChildren, setCanRenderChildren] = useState(false)

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setShowFallback(true)
        }, delayMs)

        return () => clearTimeout(delayTimer)
    }, [delayMs])

    useEffect(() => {
        if (showFallback) {
            const minTimer = setTimeout(() => {
                setCanRenderChildren(true)
            }, minDurationMs)

            return () => clearTimeout(minTimer)
        }
    }, [showFallback, minDurationMs])

    return (
        <Suspense fallback={null}>
            {(!showFallback || !canRenderChildren) ? fallback : children}
        </Suspense>
    )
}

export default DelayedRouter
