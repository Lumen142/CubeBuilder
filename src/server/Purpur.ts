import fs from 'fs/promises';
import path from "path"

type versionsTYPE = {
    versions: string[]
}

export async function get_versions() {
    const data = await fs.readFile(path.resolve(__dirname, "../conf/softwares.json"), "utf-8")
    const settings = JSON.parse(data)

    const versionsResponse = await fetch(settings["Purpur"]["api"]["versions"])
    const versions = (await versionsResponse.json()) as versionsTYPE

    return versions["versions"]
}
