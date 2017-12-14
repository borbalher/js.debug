// color id
let cid = -1;

const
util       = require('util'),
dateformat = require('dateformat'),
colors     = ['blue','cyan','green','magenta','red','yellow'],
output     = function(args, cb)
{
  this.sn = this.sn < Number.MAX_SAFE_INTEGER ? this.sn + 1 : 0;
  this.config.debug && cb(
    [ this.config.date   && dateformat(new Date(), this.config.dateFormat),
      this.config.prefix,
      this.config.index  && this.sn
    ].filter(_=>_).concat(args).map((arg) =>
      typeof arg == 'object'
      ? util.inspect(arg, this.getInspectOptions())
      : this.colorize(this.escape(arg))).join(this.config.separator));
},
Debug      = module.exports = class
{
  constructor(options)
  {
    // cycles the colors to prevent duplicates
    cid = ++cid < colors.length ? cid : 0;

    // log messages counter, serial number
    this.sn     = 0;
    this.config = Object.assign(
    {
      maxArrayLength  : 10,
      maxObjectDepth  : 10,
      maxStringLength : 100,
      color           : colors[cid],
      colors          : true,
      date            : true,
      dateFormat      : 'yyyy-mm-dd HH:MM:ss',
      debug           : true,
      index           : false,
      prefix          : false,
      separator       : '\t',
      stderr          : process.stderr,
      stdout          : process.stdout
    }, options);

    switch (this.config.color)
    {
      case 'black'  : this.color = '30'; break;
      case 'blue'   : this.color = '34'; break;
      case 'cyan'   : this.color = '36'; break;
      case 'green'  : this.color = '32'; break;
      case 'magenta': this.color = '35'; break;
      case 'red'    : this.color = '31'; break;
      case 'yellow' : this.color = '33'; break;
      case 'white'  : this.color = '37'; break;
    }

    this.console = new console.Console(this.config.stdout, this.config.stderr);
  }

  colorize(s)
  {
    return this.color
    ? '\x1b[' + this.color + 'm' + s + '\x1b[0m'
    : s;
  }

  escape(s)
  {
    if(Object.prototype.toString.call(s) === '[object String]')
    {
      s = s.replace(/[\x00-\x09\x10-\x1F]/g, '').trim();
      if(s.length > this.config.maxStringLength)
      {
        const segment = Math.floor(this.config.maxStringLength / 2);
        s =
        [ s.substr(0, segment).trim(),
          s.substr(  -segment).trim()
        ].join(' ... ');
      }
    }

    return s;
  }

  getInspectOptions()
  {
    const options =
    {
      depth          : this.config.maxObjectDepth,
      colors         : this.config.colors,
      maxArrayLength : this.config.maxArrayLength
    };

    return options;
  }

  log(...args)
  {
    output.call(this, args, this.console.log.bind(this.console));
  }

  error(...args)
  {
    output.call(this, args, this.console.error.bind(this.console));
  }

  trace(...args)
  {
    output.call(this, args, this.console.trace.bind(this.console));
  }
}

const static_debug    = new Debug();
module.exports.log    = static_debug.log  .bind(static_debug);
module.exports.error  = static_debug.error.bind(static_debug);
module.exports.trace  = static_debug.trace.bind(static_debug);
