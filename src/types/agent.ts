export interface Network {
    name: string;
    index: number;
    mtu: number;
    ipv4?: string[];
    ipv6?: string[];
    mac: string;
}

export interface TunnelStat {
    connected_at?: string;
    disconnected_at?: string;
    keepalive_at?: string;
    protocol: string;
    subprotocol: string;
    local_addr: string;
    remote_addr: string;
    receive_bytes?: number;
    transmit_bytes?: number;
}

export interface ExecuteStat {
    goos: string;
    goarch: string;
    pid: number;
    args: string[];
    hostname: string;
    workdir: string;
    executable: string;
    username: string;
}

export interface Broker {
    id: string;
    name: string;
}

export interface Agent {
    id: string;
    machine_id: string;
    status: boolean;
    broker?: Broker;
    networks?: Network[];
    tunnel_stat?: TunnelStat;
    execute_stat?: ExecuteStat;
    created_at: string;
    updated_at: string;
}

export interface AgentListResponse {
    page: number;
    size: number;
    count: number;
    records: Agent[];
}
