import { useState } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
    code: string
    language: "bash" | "typescript" | "python"
    showCopy?: boolean
}

export function CodeBlock({ code, language, showCopy = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative">
            <Highlight
                theme={themes.nightOwl}
                code={code}
                language={language}
            >
                {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="overflow-x-auto p-4 rounded-lg text-sm" style={style}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
            {showCopy && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            )}
        </div>
    )
}