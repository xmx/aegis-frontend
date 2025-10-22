import {useEffect, useState} from "react";
import type {Agent, AgentListResponse} from "../types/agent";
import styles from "../styles/Agents.module.css";
import Format from "../utils/Format";

export default function Agents() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<Agent | null>(null);

    async function fetchAgents() {
        setLoading(true);
        try {
            const resp = await fetch(`/api/agents?page=${page}&size=${size}&keyword=${keyword}`);
            if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);
            const data: AgentListResponse = await resp.json();
            setAgents(data.records);
            setTotal(data.count);
        } catch (err) {
            console.error("fetchAgents error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAgents();
    }, [page, keyword]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Agent 列表</h2>

            <div className={styles.toolbar}>
                <input
                    type="text"
                    placeholder="搜索关键字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={styles.input}
                />
                <button onClick={fetchAgents} className={styles.primaryBtn}>搜索</button>
            </div>

            {loading ? (
                <p>加载中...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>主机名</th>
                        <th>IP</th>
                        <th>系统架构</th>
                        <th>流量 (上 / 下)</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {agents.map((a) => {
                        const firstIPv4 = a.networks?.find((n) => n.ipv4?.length)?.ipv4?.[0] || "-";
                        const up = Format.bytes(a.tunnel_stat?.transmit_bytes);
                        const down = Format.bytes(a.tunnel_stat?.receive_bytes);
                        return (
                            <tr key={a.id}>
                                <td>
                                    <span className={styles.hostname}>{a.execute_stat?.hostname}</span>
                                    <span
                                        className={`${styles.statusDot} ${a.status ? styles.online : styles.offline}`}
                                        title={a.status ? "在线" : "离线"}
                                    />
                                </td>
                                <td>{firstIPv4}</td>
                                <td>{a.execute_stat?.goos}/{a.execute_stat?.goarch}</td>
                                <td>
                                    <span className={styles.upload}>↑ {up}</span>{" / "}
                                    <span className={styles.download}>↓ {down}</span>
                                </td>
                                <td>
                                    <button className={styles.detailBtn} onClick={() => setSelected(a)}>
                                        详情
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}

            <div className={styles.pagination}>
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>上一页</button>
                <span>第 {page} 页 / 共 {Math.ceil(total / size)} 页</span>
                <button disabled={page * size >= total} onClick={() => setPage((p) => p + 1)}>下一页</button>
            </div>

            {selected && (
                <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3>Agent 详情</h3>
                        <pre>{JSON.stringify(selected, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
