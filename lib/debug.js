const
util    = require('util'),
colors  = ['blue','cyan','green','magenta','red','yellow'];

module.exports = (options = {}) =>
{
  const config =
  {
    debug : options.debug   == false ? false : true,
    depth : options.depth   || 10,
    color : options.color   || colors[Math.floor(Math.random()*colors.length)],
    colors: options.colors  == false ? false : true,
    prefix: options.prefix  || 'debug:'
  };

  let color;
  switch (config.color)
  {
    case blue:    color = '34'; break;
    case cyan:    color = '36'; break;
    case green:   color = '32'; break;
    case magenta: color = '35'; break;
    case red:     color = '31'; break;
    case yellow:  color = '33'; break;
    case black:   color = '30'; break;

    case white:
    default:
      color = '37';
      break;
  }

  return (...args) =>
    config.debug
    && console.log(
      args.map((arg) =>
        typeof arg == 'object'
        ? util.inspect(arg, {depth:config.depth, colors:config.colors})
        : '\x1b[' + color + 'm' + arg + '\x1b[0m')).unshift(config.prefix);
};
