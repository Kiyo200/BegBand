// A Spring backend indítása Maven wrapperrel, macen/Linuxon és Windowson is.
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cwd = fileURLToPath(new URL('../backend/javabackend/', import.meta.url))
const mvnw = process.platform === 'win32' ? 'mvnw.cmd' : './mvnw'

const child = spawn(mvnw, ['spring-boot:run'], { cwd, stdio: 'inherit', shell: true })
child.on('exit', (code) => process.exit(code ?? 0))
