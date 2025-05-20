import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
// https://vite.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: true, // 构建前清空输出目录
        sourcemap: true,
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将 ant-design-vue 单独分包
                    "antd": ["ant-design-vue"],
                    // 将 vue 运行时核心代码分离
                    "vue-core": ["vue", "vue-router", "pinia"]
                },
                // 禁止将声明文件打包到dist
                preserveModules: false
            }
        }
    },
    root: './',
    publicDir: 'public',
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        hmr: {
            overlay: false
        },
        port: 8000
    }
});
