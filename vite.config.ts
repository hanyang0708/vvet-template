import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from 'vite-plugin-electron';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const path = require('path')

export default defineConfig({
    plugins: [
        vue(),
        electron([
            {
                entry: 'electron/main/index.ts',
                vite: {
                    build: {
                        // For Debug
                        sourcemap: true,
                        outDir: 'dist/electron/main',
                    },
                },
            },
            {
                entry: 'electron/preload/index.ts',
                vite: {
                    build: {
                        // For Debug
                        sourcemap: true,
                        outDir: 'dist/electron/preload',
                    },
                },
            },


        ]),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
    ],
    build: {
        emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always", // 括号内才使用数学计算
                charset: false,
                additionalData: '@import "./src/style/index.less";',
                javascriptEnabled: true,
            },
        },
    },
});