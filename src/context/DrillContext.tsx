import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Drill {
    id: string
    title: string
    date: string
    objective: string
    category?: string
    fieldType?: 'full' | 'half' | '7v7'
    groundSize?: 'whole' | 'half'
    fieldWidth?: number
    fieldLength?: number
    steps: DrillStep[]
}

export interface DrillStep {
    id: string
    title: string
    objective?: string
    // Legacy fields kept for compatibility if needed, but will be derived from drill or unused
    fieldType?: 'full' | 'half' | '7v7'
    groundSize?: 'whole' | 'half'
    fieldWidth?: number
    fieldLength?: number
    canvasData?: any // Will store data (elements, positions)
}

interface DrillContextType {
    currentDrill: Drill | null
    setCurrentDrill: (drill: Drill | null) => void
    addStep: (step: DrillStep) => void
    updateStep: (stepId: string, step: Partial<DrillStep>) => void
    deleteStep: (stepId: string) => void
}

const DrillContext = createContext<DrillContextType | undefined>(undefined)

export function DrillProvider({ children }: { children: ReactNode }) {
    const [currentDrill, setCurrentDrill] = useState<Drill | null>(() => {
        try {
            const saved = localStorage.getItem('currentDrill');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to load drill from storage", e);
            return null;
        }
    });

    useEffect(() => {
        if (currentDrill) {
            localStorage.setItem('currentDrill', JSON.stringify(currentDrill));
        }
    }, [currentDrill]);

    const addStep = (step: DrillStep) => {
        if (currentDrill) {
            setCurrentDrill({
                ...currentDrill,
                steps: [...currentDrill.steps, step]
            })
        }
    }

    const updateStep = (stepId: string, updatedStep: Partial<DrillStep>) => {
        if (currentDrill) {
            setCurrentDrill({
                ...currentDrill,
                steps: currentDrill.steps.map(step =>
                    step.id === stepId ? { ...step, ...updatedStep } : step
                )
            })
        }
    }

    const deleteStep = (stepId: string) => {
        if (currentDrill) {
            setCurrentDrill({
                ...currentDrill,
                steps: currentDrill.steps.filter(step => step.id !== stepId)
            })
        }
    }

    return (
        <DrillContext.Provider
            value={{
                currentDrill,
                setCurrentDrill,
                addStep,
                updateStep,
                deleteStep
            }}
        >
            {children}
        </DrillContext.Provider>
    )
}

export function useDrill() {
    const context = useContext(DrillContext)
    if (context === undefined) {
        throw new Error('useDrill must be used within a DrillProvider')
    }
    return context
}
