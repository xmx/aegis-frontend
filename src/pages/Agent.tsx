import {useState, useEffect} from "react";
import styles from "../styles/Agents.module.css";
import * as Format from "../utils/format";
import type {Agent} from "../types/agent.ts";
import type {PageResponse} from "../types/page.ts";
import {PageRequest} from "../types/page.ts";

export default function Agent() {
    const [records, setRecords] = useState<Agent[]>([])
    const [keyword, setKeyword] = useState("");
    const [selected, setSelected] = useState<Agent | null>(null);

    const [pageRequest] = useState(new PageRequest());


    function getAgents() {
        fetch(`/api/agents?${pageRequest.toQuery()}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`HTTP ${resp.status}`);
                }
                return resp.json() as Promise<PageResponse<Agent>>; // ⚠️ 必须返回解析后的 JSON
            })
            .then(data => {
                setRecords(data.records ?? []);
            })
            .catch(err => {
                console.error("fetchAgents failed:", err);
            });
    }

    useEffect(getAgents, [pageRequest]);

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <input
                    type="text"
                    placeholder="请输入关键字搜索"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={styles.input}
                />
                <button onClick={getAgents} className={styles.primaryBtn}>搜索</button>
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>名字</th>
                    <th>IP</th>
                    <th>系统架构</th>
                    <th>上行/下行流量</th>
                    <th>时间</th>
                    <th>详情</th>
                </tr>
                </thead>
                <tbody>
                {records.map((a) => {
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
                            <td>{Format.date(a.created_at)}</td>
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

            {selected && (
                <div className={styles.modalOverlay} onClick={() => setSelected(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3>详情</h3>
                        <pre className={styles.container}>{JSON.stringify(selected, null, '\t')}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
