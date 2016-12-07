const
util    = require('util'),
colors  = ['blue','cyan','green','magenta','red','yellow'];

// color index starts from a random color
let color_i = Math.floor(Math.random() * colors.length);

module.exports = (options = {}) =>
{
  // cycles the colors to prevent duplicates
  color_i = ++color_i < colors.length ? color_i : 0;

  const
  config =
  {
    color     : 'color'     in options ? options.color      : colors[color_i],
    colors    : 'colors'    in options ? options.colors     : true,
    date      : 'date'      in options ? options.date       : true,
    debug     : 'debug'     in options ? options.debug      : true,
    depth     : 'depth'     in options ? options.depth      : 10,
    prefix    : 'prefix'    in options ? options.prefix     : 'debug',
    separator : 'separator' in options ? options.separator  : ':\t'
  },
  colorize = (txt) => '\x1b[' + color + 'm' + txt + '\x1b[0m',
  escape   = (txt) => txt.replace
                    ? txt.replace(/[\x00-\x09\x10-\x1F]/g, '')
                    : txt;

  // mapping colors
  let color;
  switch (config.color)
  {
    case 'black'  : color = '30'; break;
    case 'blue'   : color = '34'; break;
    case 'cyan'   : color = '36'; break;
    case 'green'  : color = '32'; break;
    case 'magenta': color = '35'; break;
    case 'red'    : color = '31'; break;
    case 'yellow' : color = '33'; break;

    case 'white':
    default:
      color = '37';
      break;
  }

  // options used for inspection
  const inspect_options =
  {
    depth          : config.depth,
    colors         : config.colors,
    maxArrayLength : 5000
  };

  // returning the logger
  return (...args) =>
    config.debug
    && console.log(
      // colorizing the prefix..
      colorize(
        [ config.prefix,
          config.date && new Date().toLocaleString()
        ].filter(_=>_).join(config.separator) + config.separator),
      // each object needs to be properly inspected, colorize the rest..
      ...args.map(arg =>
        typeof arg == 'object'
        ? util.inspect(arg, inspect_options)
        : colorize(escape(arg))));
};
