# Third-party notices

## Babylon.js 9.30.0

- Project: https://github.com/BabylonJS/Babylon.js
- Distribution: https://cdn.babylonjs.com/babylon.js (vendored in `dist/vendor/babylon.js`)
- License: Apache License 2.0
- License copy: [dist/vendor/LICENSE.babylonjs.md](dist/vendor/LICENSE.babylonjs.md)
- Upstream license: https://github.com/BabylonJS/Babylon.js/blob/master/license.md

The game loads the vendored UMD build directly; Node-based tests use the same file with Babylon.js NullEngine.

## Fonts

The stylesheet requests Noto Serif JP and Noto Sans JP through Google Fonts. Font files are not redistributed in this repository. System fallback fonts are used if the external stylesheet cannot load.

## Character models

- Samurai (rigged) and Horse by Grab3D, CC0 1.0. Source: https://grab3d.com/models/characters/samurai/ and https://grab3d.com/models/animals/horse/ . AI-assisted source meshes. Geometry simplified and textures resized for browser use; game scale, material tint, weapons and animation controls adapted. Original license notices and source metadata are retained in `dist/assets/characters/`.
- Cinder Oni AWAKENED from **Moonveil Oni - 4 Textured Characters with Walk Cycles**, by **KashiroZen**. **Creative Commons Attribution 4.0** (https://creativecommons.org/licenses/by/4.0/). Source: https://kashirozen.itch.io/kashirozen-moonveil-cinder-oni . AI-assisted source meshes prepared, textured and rigged by KashiroZen. Local filenames, game scale, material tint, weapons and animation controls adapted. Original README/license: `dist/assets/characters/moonveil-LICENSE.txt`. These assets retain their CC BY 4.0 license.
- Environment reflection map: Babylon.js sample assets, https://assets.babylonjs.com/environments/environmentSpecular.env .
- Babylon.js glTF loader: official Babylon.js distribution, Apache License 2.0, covered by the vendored Babylon.js license.
