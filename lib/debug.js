const
util    = require('util'),
colors  = ['blue','cyan','green','magenta','red','yellow'];

// color index starts from a random color
let color_i = Math.floor(Math.random() * colors.length);

module.exports = (options = {}) =>
{
  // cycles the colors to prevent duplicates
  color_i = color_i < colors.length ? color_i : 0;

  const
  config =
  {
    debug : options.debug   == false ? false : true,
    depth : options.depth   || 10,
    color : options.color   || colors[color_i++],
    colors: options.colors  == false ? false : true,
    prefix: options.prefix  || 'debug:'
  },
  colorize = (txt) => '\x1b[' + color + 'm' + txt + '\x1b[0m';

  let color;
  switch (config.color)
  {
    case 'blue'   : color = '34'; break;
    case 'cyan'   : color = '36'; break;
    case 'green'  : color = '32'; break;
    case 'magenta': color = '35'; break;
    case 'red'    : color = '31'; break;
    case 'yellow' : color = '33'; break;
    case 'black'  : color = '30'; break;

    case 'white':
    default:
      color = '37';
      break;
  }

  return (...args) =>
    config.debug
    && console.log(colorize(config.prefix), ...
      args.map((arg) =>
        typeof arg == 'object'
        ? util.inspect(arg, {depth:config.depth, colors:config.colors})
        : colorize(arg)));
};
