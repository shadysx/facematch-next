"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageIcon } from "lucide-react"

interface File {
    name: string
    size: number
}

export default function FilesPage() {
    const params = useParams()
    const brainId = params.id as string
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`/api/files/${brainId}`)
                const data = await response.json()
                setFiles(data.files || [])
            } catch (error) {
                console.error('Failed to fetch files:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchFiles()
    }, [brainId])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Card>
            <CardContent className="p-4">
                <ScrollArea className="h-[400px]">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2">
                            <ImageIcon className="h-4 w-4 text-purple-600" />
                            <span>{file.name}</span>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
} 