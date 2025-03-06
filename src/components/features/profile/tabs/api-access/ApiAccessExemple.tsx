import { TabsContent } from "@/components/ui/tabs"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tabs } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/common/CodeBlock"
import { Globe, Code2, Terminal } from "lucide-react"
import { pythonExample, javascriptExample, curlExample } from "@/lib/code-blocks/codeblocks"

export const ApiAccessExemple = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-gradient-to-b from-muted/50 to-background p-6">
                <h3 className="text-xl font-semibold mb-4">API Access</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Use your API key to access our endpoints programmatically
                </p>

                <Tabs defaultValue="curl" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="curl">
                            <Terminal className="w-4 h-4 mr-2" />
                            cURL
                        </TabsTrigger>
                        <TabsTrigger value="javascript">
                            <Code2 className="w-4 h-4 mr-2" />
                            JavaScript
                        </TabsTrigger>
                        <TabsTrigger value="python">
                            <Globe className="w-4 h-4 mr-2" />
                            Python
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="curl">
                        <CodeBlock code={curlExample} language="bash" />
                    </TabsContent>

                    <TabsContent value="javascript">
                        <CodeBlock code={javascriptExample} language="typescript" />
                    </TabsContent>

                    <TabsContent value="python">
                        <CodeBlock code={pythonExample} language="python" />
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}