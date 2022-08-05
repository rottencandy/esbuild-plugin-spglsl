esbuild-plugin-spglsl
---

An [esbuild](https://github.com/evanw/esbuild) plugin for [spglsl](https://github.com/SalvatorePreviti/spglsl).

Adds support for importing shaders from `*.glsl`, `*.vert` & `*.frag` files.

## Usage

1. Install the plugin:
```sh
npm install --save-dev esbuild-plugin-spglsl
```

2. Add the plugin to your esbuild build script:
```js
const esbuild = require('esbuild')
const SpglslPlugin = require('esbuild-plugin-spglsl')

 esbuild.build({
   entryPoints: ['src/index.ts'],
   bundle: true,
   plugins: [
    SpglslPlugin({
      compileMode: 'Optimize',
      minify: true,
      mangle: true,
      mangle_global_map: {
        my_uniform_to_rename: "x",
        my_fragment_input_to_rename: "y",
      },
    }),
   ],
 })
```
