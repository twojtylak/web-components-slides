import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  copy: [
    { src: '../node_modules/highlight.js', dest: 'lib/highlight.js' },
    { src: '../node_modules/impress.js/js', dest: 'lib/impress.js' },

  ]
};
