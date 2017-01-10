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
  config = Object.assign(
  {
    color     : colors[color_i],
    colors    : true,
    date      : true,
    debug     : true,
    depth     : 10,
    prefix    : 'debug',
    separator : ':\t'
  }, options),
  colorize = (txt) => '\x1b[' + color + 'm' + txt + '\x1b[0m',
  escape   = (txt) => txt && txt.replace
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
  const inspectOptions =
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
        ? util.inspect(arg, inspectOptions)
        : colorize(escape(arg))));
};
