import {useState, useEffect} from "react"
import {ThemeProvider} from "@/components/theme-provider"
import {Pagination} from "@/components/ui/pagination"
import * as resnode from "@/types/response/node"
import * as respage from "@/types/response/page"

function App() {
    const [brokers, setBrokers] = useState<resnode.Broker[]>([])
    const [page, setPage] = useState(1)
    const [size] = useState(10)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`/api/brokers?page=${page}&size=${size}`, {
                    signal: controller.signal
                })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: respage.Page<resnode.Broker> = await res.json()
                setBrokers(data.records)
                setCount(data.count)
            } catch (err: any) {
                if (err.name !== "AbortError") setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        return () => controller.abort()
    }, [page, size])

    const totalPages = Math.ceil(count / size)

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex min-h-svh flex-col items-center justify-start p-8 gap-4">
                {loading && <p>加载中...</p>}
                {error && <p className="text-red-500">请求错误: {error}</p>}

                {!loading && !error && (
                    <table className="table-auto border border-gray-600">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border">名称</th>
                            <th className="px-4 py-2 border">状态</th>
                            <th className="px-4 py-2 border">系统</th>
                            <th className="px-4 py-2 border">暴露地址</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brokers.map((b) => (
                            <tr key={b.id}>
                                <td className="px-4 py-2 border">{b.name}</td>
                                <td className="px-4 py-2 border">{b.status ? "在线" : "离线"}</td>
                                <td className="px-4 py-2 border">{b.execute_stat?.goos}</td>
                                <td className="px-4 py-2 border">{b.exposes?.join(", ") || "-"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {/* Shadcn 风格分页 */}
                <Pagination page={page} total={totalPages} onChange={setPage}/>
            </div>
        </ThemeProvider>
    )
}

export default App
