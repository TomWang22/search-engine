// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';  // Corrected default import
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production  // Move 'dev' into 'compilerOptions'
      },
      emitCss: true  // Ensure component CSS is emitted
    }),
    css({ output: 'bundle.css' }),  // Handle global CSS files
    replace({
      preventAssignment: true,
      'process.env.API_BASE_URL': production
        ? JSON.stringify('https://your-production-url.com')
        : JSON.stringify('http://localhost:3000')
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser()  // Minify for production
  ],
  watch: {
    clearScreen: false
  }
};

async function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    async writeBundle() {
      if (server) return;

      const { spawn } = await import('child_process');  // Dynamically import 'child_process'

      server = spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}
