import {defineConfig} from "vite";
import dts from 'vite-plugin-dts'
export default defineConfig({
    plugins:[dts({

    })],
    build:{
        lib:{
            entry:"./src/main.ts",
            formats:['es','cjs','umd'],
            name:'eb'
        }
    }
})