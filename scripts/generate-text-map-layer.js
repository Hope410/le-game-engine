const makeCli = require('make-cli');
const fs = require('fs/promises');
const _ = require('lodash');

const DEFAULT_WIDTH = 60;
const DEFAULT_HEIGHT = 30;
const DEFAULT_FILL_CHAR = '#';

makeCli({
  version: '0.1.0',
  name: 'generate-text-map-layer',
  options: [
    {
      name: '-w, --width <width>',
      defaultValue: DEFAULT_WIDTH,
      description: 'Map width',
    },
    {
      name: '-h, --height <height>',
      defaultValue: DEFAULT_HEIGHT,
      description: 'Map height',
    },
    {
      name: '-p, --path <path>',
      description: 'Map file path',
    },
    {
      name: '--fill-char <fillChar>',
      defaultValue: DEFAULT_FILL_CHAR,
      description: 'Specifies the fill char',
    },
  ],
  action: async ({ height, width, fillChar, path }, options) => {
    try {
      if (!path) throw new Error("Path didn't specified");

      const out = _.range(0, Number(height) || DEFAULT_HEIGHT)
        .map(() =>
          _.range(0, Number(width) || DEFAULT_WIDTH)
            .map(() => fillChar || DEFAULT_FILL_CHAR)
            .join('')
        )
        .join('\n');

      await fs.writeFile(path, out);

      console.info('Text map successfully generated!');
    } catch (e) {
      console.error(e);
    }
  },
});
