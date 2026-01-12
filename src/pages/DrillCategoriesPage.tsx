import { Button } from "@/components/ui/button"
import { Plus, Sword, Shield, ArrowLeftRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface DrillCategory {
    id: string
    title: string
    icon: React.ComponentType<{ className?: string }>
    gradient: string
    description: string
}

const drillCategories: DrillCategory[] = [
    {
        id: "attacking",
        title: "Attacking",
        icon: Sword,
        gradient: "from-orange-500 to-red-600",
        description: "Offensive drills and strategies"
    },
    {
        id: "defence",
        title: "Defence",
        icon: Shield,
        gradient: "from-blue-500 to-indigo-600",
        description: "Defensive formations and tactics"
    },
    {
        id: "overlapping",
        title: "Overlapping",
        icon: ArrowLeftRight,
        gradient: "from-green-500 to-emerald-600",
        description: "Overlapping runs and movements"
    }
]

function DrillCategoryCard({ category }: { category: DrillCategory }) {
    const Icon = category.icon

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] cursor-pointer">
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />

            {/* Content */}
            <div className="relative flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-7 w-7 text-white" />
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-sm text-slate-400">{category.description}</p>
                </div>

                <div className="text-slate-600 transition-colors duration-300 group-hover:text-slate-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function DrillCategoriesPage() {
    const navigate = useNavigate()

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="mx-auto max-w-md px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-white">Football Drills</h1>
                    <p className="text-slate-400">Select a category to get started</p>
                </div>

                {/* Create New Button */}
                <Button
                    onClick={() => navigate('/create-drill')}
                    className="mb-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl active:scale-[0.98]"
                    size="lg"
                >
                    <Plus className="mr-2 h-6 w-6" />
                    Create New Drill
                </Button>

                {/* Drill Categories */}
                <div className="space-y-4">
                    {drillCategories.map((category) => (
                        <DrillCategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </main>
    )
}
