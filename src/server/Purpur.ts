import fs from 'fs/promises';
import path from "path"

import settings from "../conf/softwares.json";

type versionsTYPE = {
    versions: string[]
}

export async function get_versions() {
    const versionsResponse = await fetch(settings["Purpur"]["api"]["versions"])
    const versions = (await versionsResponse.json()) as versionsTYPE

    return versions["versions"]
}
