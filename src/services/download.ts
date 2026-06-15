import { join } from "path"
import { success, error, warn, info } from "../packages/Message.ts"

export async function download(target_path: string, file_name: string, url: string) {
    const path = join(target_path, file_name + ".jar")

    console.log(info("The download is starting..."))
    console.log(info("Depending on the file size, the download may take a little while. Please be patient during this process. If your internet connection is slow, this may take a little while."))

    const response = await fetch(url)
    if (!response.ok) {
        console.log(error(`The download failed. (${response.status})`))
        console.log(warn(`You need to delete the files that have been created.`))
        process.exit(0)
    }

    await Bun.write(path, response)

    console.log(success("The download was completed successfully."))
}

//download("./","server","https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/496/downloads/paper-1.20.4-496.jar")
