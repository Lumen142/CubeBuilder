import pc from 'picocolors';

export function success(msg: string) {
    const newMessage = pc.green("✔ " + msg + " " + performance.now())
    return newMessage
}

export function error(msg: string) {
    const newMessage = pc.red("✖ " + msg + " " + performance.now())
    return newMessage
}

export function warn(msg: string) {
    const newMessage = pc.yellow("⚠ " + msg + " " + performance.now())
    return newMessage
}

export function info(msg: string) {
    const newMessage = pc.bgBlue(pc.white(" INFO ")) + ` ${msg}` + " " + performance.now()
    return newMessage
}
