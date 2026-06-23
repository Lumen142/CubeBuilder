
<img width="2560" height="1440" alt="CubeBuilderBanner" src="https://github.com/user-attachments/assets/6915aa36-8468-496b-a829-2b2dcd00a363" />

# CubeBuilder V1.0.0

Our goal is to enable you to manage the basic Minecraft server folder structure through a single piece of software. As CubeBuilder develops, it will support many more Minecraft server software packages.

#### Supported Operating Systems

| OS | Tested | Status |
| :-------- | :------- | :------------------------- |
| Windows 11 | ✓ | Works properly |
| CachyOS (Arch Linux) | ✓ | Works properly |
| Windows 10 | ⚠️ | Not tested (expected to work) |
| Ubuntu | ⚠️ | Not tested (expected to work) |
| Debian | ⚠️ | Not tested (expected to work) |
| Fedora | ⚠️ | Not tested (expected to work) |
| macOS | ⚠️ | Not tested and not officially supported (may not work correctly due to system differences) |

#### Server Software

| Software | Status |
| :-------- | :------------------------- |
| PaperMC | ✅
| Purpur | ✅

## FAQ

### ❓ Is the JDK downloaded automatically?

Unfortunately, it is not downloaded automatically in JDK version 1.0.0. However, this process was automated in later versions. If no other version is available, you will need to wait for future releases.

#### ❓ What is CubeBuilder?

CubeBuilder is an automation tool that helps you quickly set up Minecraft server environments by downloading the selected server software and generating the required folder structure and startup files automatically.

#### ❓ Will Other Server Software Be Supported?

Yes, there will be. However, to integrate them into CubeBuilder, certain requirements are needed. Only server software that has the necessary API infrastructure and can provide version information and download links from their official sources will be included in the system.

#### ❓ Which server software is supported?

Currently, CubeBuilder supports PaperMC and Purpur. Additional server software may be added in the future if they provide a suitable API for version and download management.

#### ❓ What does CubeBuilder automate?

CubeBuilder automatically creates the standard server directory structure, downloads the correct server JAR file, and generates platform-specific startup files like `run.sh` and `run.bat`.

### ❓ Can I configure the server manually?

Yes. CubeBuilder automatically generates the initial server setup, including the required folder structure inside the `servers` directory, the server files, and startup scripts (`run.sh` / `run.bat`). It also automatically creates and accepts the EULA during installation.

However, the `server.properties` file is left for manual configuration, allowing users to customize their server settings freely after setup. After restarting CubeBuilder, you can choose to open the `servers` folder on the first prompt, giving you direct access to all server files for manual editing or management.

