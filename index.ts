import { the_text_function, the_select_function } from "./src/packages/Prompt.ts"

import { get_versions, get_builds } from "./src/server/PaperMC.ts"
import { get_versions as purpur_get_versions } from "./src/server/Purpur.ts"

import { create_server_file } from "./src/packages/ServerManager.ts"
import { download } from "./src/services/download.ts";

import { $ } from "bun"
import fs from "fs"
import * as path from "path";
import os from "os"
import { success, error, warn } from "./src/packages/Message.ts";

type OptionType = {
    label: string;
    value: string;
};

const platform: string = os.platform();

const tested_os = {
    "win32": true,
    "linux": true,
    "darwin": false
}
const os_emojis = {"win32": "🪟","linux": "🐧","darwin": "🍎"}

async function openFolderInExplorer(folderPath: string): Promise<void> {
  try {
    if (platform === "win32") {
    const safePath = path.win32.normalize(folderPath);
    await $`cmd /c start "" "${safePath}"`;
    } else if (platform === "darwin") {
      await $`open ${folderPath}`;
    } else {
      await $`xdg-open ${folderPath}`;
    }
    console.log(success(`Folder opened successfully: ${folderPath}`));
  } catch (err) {
    console.log(error("An error occurred while opening the folder: " + err));
    process.exit(0)
  }
}

async function main() {
    const banner = `
    ____      _          ____        _ _     _           
    / ___|   _| |__   ___| __ ) _   _(_) | __| | ___ _ __ 
    | |  | | | | '_ \\ / _ \\  _ \\| | | | | |/ _\` |/ _ \\ '__|
    | |__| |_| | |_) |  __/ |_) | |_| | | | (_| |  __/ |   
    \\____\\__,_|_.__/ \\___|____/ \\__,_|_|_\\__,_|\\___|_|   

    Operating system used: ${platform} ${(os_emojis as any)[platform]}
    `;

    console.log(banner)

    if (platform in tested_os) {
        if ( (tested_os as any)[platform] ) {
            console.log(success("This software has been tested on your operating system! 🥳"))
        } else {
            console.log(warn("This software has not been tested on your operating system. 🥺"))
        }
    } else {
        console.log(error("We have no information regarding compatibility. We couldn't access any data related to your operating system, which is why crashes or malfunctions are possible. 😭"))
    }

    const choose = await the_select_function("What do you want to do?", [
        {value: "setup_server", label:"I want to set up a Minecraft server."},
        {value: "servers", label:"I want to view the servers I set up."},
        { value: 'exit', label: 'Close Program', hint: "Exit the program. 😭" }
    ])

    if (choose == "setup_server") {
        // Choosing server software.

        const server = await the_select_function("Which Software Do You Want to Use?", [
            { value: 'paper', label: 'PaperMC', hint: "High-performance Minecraft server software. It fixes bugs, improves lag, and supports Bukkit/Spigot plugins." },
            { value: 'purpur', label: 'Purpur', hint: "A fork of Paper. It offers maximum performance and adds hundreds of new customization options for game mechanics." }
        ])

        if (server == "paper") {
            // Select a version.

            const versions = await get_versions()

            const v_options: OptionType[] = versions.toReversed().map(v => ({
                value: v,
                label: v
            }))

            const version = await the_select_function("Which Software Do You Want to Use?", v_options) as string

            // Select a build.

            const buildsResponse = await get_builds(version) as any
            const builds = buildsResponse.builds

            const b_options: OptionType[] = builds.toReversed().map((v: string) => ({
                value: String(v),
                label: String(v)
            }))

            const build = await the_select_function("Which build of this version would you like to use?", b_options) as string

            // Create Server File

            const folderName = await the_text_function("Server file name?", "Please enter a file name for your server.", "")

            const target_path = await create_server_file(String(folderName))

            await download(target_path, "server", `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`)
            
            process.exit(0)
        } else if (server == "purpur") {
            // Select a version.

            const versions = await purpur_get_versions()

            const v_options: OptionType[] = versions.toReversed().map(v => ({
                value: v,
                label: v
            }))

            const version = await the_select_function("Which Software Do You Want to Use?", v_options) as string

            // Create Server File

            const folderName = await the_text_function("Server file name?", "Please enter a file name for your server.", "")

            const target_path = await create_server_file(String(folderName))

            await download(target_path, "server", `https://api.purpurmc.org/v2/purpur/${version}/latest/download`)

            process.exit(0)
        }
    } else if (choose == "exit") {
        console.log(success("See you later! 🙃"))
        process.exit(0)
    }
    else if (choose == "servers") {
        if (!fs.existsSync("./servers")) {
            console.log(warn(`The "./servers" folder does not exist. It is created by the system.`))
            fs.mkdirSync("./servers", { recursive:true })
            console.log(success(`The "./servers" folder has been created.`))
        }

        await openFolderInExplorer(path.resolve(process.cwd(), "servers"))
    }
}

main()
