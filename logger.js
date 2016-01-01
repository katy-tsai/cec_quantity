var log4js = require('log4js');
var logger = log4js.getLogger('cec');
var config = require('./config').setLogger;
var path = require('path');
log4js.configure({
	appenders: [
		{ type: 'console' },
		{
			type: 'dateFile',
			absolute: true,
			filename:  config.log_path || path.join(__dirname, 'log/'),
			maxLogSize: 1024 * 1024,
			backup: 3,
			pattern: "logs-yyyy-MM-dd.log",
			alwaysIncludePattern: true,
			category: 'cec'

		}
	]
});

logger.setLevel(config.log_level);

module.exports = logger;
