import fs from 'fs/promises';
import path from "path"
import { error, info, success, warn } from '../packages/Message';

type versionsTYPE = {
    versions: string[]
}

export async function get_versions() {
    const data = await fs.readFile(path.resolve(__dirname, "../conf/softwares.json"), "utf-8")
    const settings = JSON.parse(data)

    const versionsResponse = await fetch(settings["PaperMC"]["api"]["versions"])
    const versions = (await versionsResponse.json()) as versionsTYPE

    return versions["versions"]
}

export async function get_builds(version: string) {
    const data = await fs.readFile(path.resolve(__dirname, "../conf/softwares.json"), "utf-8")
    const settings = JSON.parse(data)

    const versions = await get_versions()

    console.log(info("Checking version..."))
    if (versions.find(v => v === version)) {
        console.log(success("The version has been verified."))
    } else {
        console.log(warn("The version could not be verified."))
        process.exit(0)
    }

    const buildsResponse = await fetch(settings["PaperMC"]["api"]["builds"] + version)
    const builds = await buildsResponse.json()

    return builds
}
