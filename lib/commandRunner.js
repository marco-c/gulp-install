
var which = require('which'),
    childProcess = require('child_process');

exports.run = function run (command, opts, cb) {
  which(command.cmd, function(err, cmdpath){
    if (err) {
      cb(new Error('Can\'t install! `' + command.cmd + '` doesn\'t seem to be installed.'));
      return;
    }
    var cmd = childProcess.spawn(cmdpath, command.args, {
      stdio: opts && opts.npmStdio ? opts.npmStdio : 'inherit',
      cwd: command.cwd || process.cwd()
    });
    cmd.on('close', function (code) {
      if (code !== 0) {
        return cb(new Error(command.cmd + ' exited with non-zero code ' + code));
      }
      cb();
    });
  });
};
