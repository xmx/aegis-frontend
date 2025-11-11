export type ExposeAddress = {
    name: string
    addr: string
}

export type BrokerConfigServer = {
    addr: string
}

export type BrokerConfigLogger = {
    level: string
    console: boolean
    filename: string
    maxsize: number
    maxage: number
    maxbackups: number
    localtime: boolean
    compress: boolean
}

export type BrokerConfig = {
    server: BrokerConfigServer
    logger: BrokerConfigLogger
}

export type NodeNetwork = {
    name: string
    index: number
    mtu: number
    ipv4?: string[]
    ipv6?: string[]
    mac: string
}

export type NodeTunnelStat = {
    connected_at: string
    disconnected_at: string
    keepalive_at: string
    protocol: string
    subprotocol: string
    local_addr: string
    remote_addr: string
    receive_bytes: number
    transmit_bytes: number
}

export type NodeExecuteStat = {
    goos: string
    goarch: string
    pid: number
    args: string[]
    hostname: string
    workdir: string
    executable: string
    username: string
}

export type Broker = {
    id: string
    name: string
    exposes: ExposeAddress[]
    status: boolean
    config: BrokerConfig
    tunnel_stat: NodeTunnelStat
    networks?: NodeNetwork[]
    execute_stat?: NodeExecuteStat
    updated_at: string
    created_at: string
}
