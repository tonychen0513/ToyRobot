#!/usr/bin/env node
import program from 'commander';
import readLine from 'readline-sync';
import { place, move, left, right, report } from './Logic';

program
  .version('0.0.1')
  .description('Toy robot control system')
  .option('-i, --interactive', 'Enable interactive mode');

program
  .command('PLACE <x> <y> <f>')
  .description(
    'Place the toy robot at the position (x, y), facing the f direction specified as NORTH, EAST, WEST or SOUTH.'
  )
  .action((x, y, f) => {
    const retVal = place(x, y, f);
    if (!retVal.isOK) console.error(retVal.errMsg);
  });

program
  .command('MOVE')
  .description(
    'Move the toy robot one unit forward in the direction it is currently facing.'
  )
  .action(() => {
    const retVal = move();
    if (!retVal.isOK) console.error(retVal.errMsg);
  });

program
  .command('LEFT')
  .description(
    'Rotate the toy robot 90 degrees to the left direction without changing the position of the robot.'
  )
  .action(() => {
    const retVal = left();
    if (!retVal.isOK) console.error(retVal.errMsg);
  });

program
  .command('RIGHT')
  .description(
    'Rotate the toy robot 90 degrees to the right direction without changing the position of the robot.'
  )
  .action(() => {
    const retVal = right();
    if (!retVal.isOK) console.error(retVal.errMsg);
  });

program
  .command('REPORT')
  .description('Report the x, y position and the direction of the toy robot.')
  .action(() => {
    const retVal = report();
    if (!retVal.isOK) console.error(retVal.errMsg);
    else console.info(retVal.msg);
  });

program.parse(process.argv);

function parseCommand(response) {
  const args = response.split(' ');
  let retVal = {};
  if (args.length > 1 && args[0].toUpperCase() === 'PLACE') {
    if (args.length === 4) {
      retVal = place(args[1], args[2], args[3]);
    } else {
      const secondArgs = args[1].split(',');
      if (secondArgs.length === 3) {
        retVal = place(secondArgs[0], secondArgs[1], secondArgs[2]);
      } else {
        return false;
      }
    }
  } else if (args.length > 0) {
    switch (args[0].toUpperCase()) {
      case 'MOVE':
        retVal = move();
        break;
      case 'LEFT':
        retVal = left();
        break;
      case 'RIGHT':
        retVal = right();
        break;
      case 'REPORT':
        retVal = report();
        break;
      default:
        return false;
    }
  }

  if (!retVal.isOK) console.error(retVal.errMsg);
  else if ('msg' in retVal) console.info(retVal.msg);

  return true;
}

if (!program.args.length) {
  if (program.interactive) {
    // Enter the interactive mode
    console.info(
      'Enter the interactive mode! Please enter your instructions. Type "exit" to exit the command.'
    );

    for (;;) {
      const response = readLine.question('> ');

      if (response.toUpperCase() === 'EXIT') {
        console.info('Bye!');
        break;
      } else if (!parseCommand(response)) {
        console.error('Unknown command or incorrect arguments provided');
      }
    }
  } else {
    // Print help if nothing is specified.
    program.outputHelp();
  }
}

module.exports = { parseCommand };
