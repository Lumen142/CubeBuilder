import fs from "fs/promises"
import path from "path"
import { the_select_function } from "./Prompt";
import { warn } from "./Message";
import * as os from 'os';

function get_total_memory() {
    return Math.round((os.totalmem() / (1024 ** 3)))
}

async function memory_question() {
    const totalMemory = get_total_memory()

    let options = []

    for (let i = 1; i <= totalMemory; i++) {
        options.push({
            value: String(i),
            label: String(i)
        })
    }

    const result = await the_select_function("How much RAM do you want to allocate for this server?", options.toReversed())

    return String(result)
}

export async function create_server_file(name: string) {
    const target_path = path.join(process.cwd(), `./servers/${name}`)

    try {
        const $result = await fs.exists(target_path)
        if (!$result) {
            await fs.mkdir(target_path, { recursive: true });

            const result = await the_select_function("Do you accept the EULA agreement?", [
                {
                    value: "true",
                    label: "I accept the contract.",
                    hint: "By using the Minecraft EULA, you agree to the terms and conditions."
                },
                {
                    value: "false",
                    label: "I do not accept the contract.",
                    hint: "By doing so, you will not be accepting the Minecraft EULA."
                },
            ])

            await fs.writeFile(`${target_path}/eula.txt`, `

                #By changing the setting below to TRUE you are indicating your agreement to our EULA (https://aka.ms/MinecraftEULA).
                #Fri Jan 23 20:25:58 TRT 2026
                eula=${String(result)}
                
                `)
            
            const memory = await memory_question()

            await fs.writeFile(`${target_path}/run.bat`, `

                java -Xms2G -Xmx${String(memory)}G -jar server.jar nogui
                
                `)
            await fs.writeFile(`${target_path}/run.sh`, `
                #!/bin/bash
                java -Xms2G -Xmx${String(memory)}G -jar server.jar nogui
                
                `)
            
            return target_path
        } else {
            console.log(warn("This folder name is already taken."))
            process.exit(0)
        }
    } catch (error) {
        console.error(`Klasör oluşturulamadı: ${error}`);
        throw error;
    }
}