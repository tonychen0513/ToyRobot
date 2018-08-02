import { parseCommand } from '../src/Shell';

test('Test interactive command parser', () => {
  // Invalid command
  expect(parseCommand('Invalid command')).toEqual(false);
  // Valid PLACE commands
  expect(parseCommand('PLACE 0 0 EAST')).toEqual(true);
  expect(parseCommand('PLACE 0,3,WEST')).toEqual(true);
  // Invalild place command
  expect(parseCommand('place 0,3')).toEqual(false);
  // Valid commands with lower cases and upper cases
  expect(parseCommand('move')).toEqual(true);
  expect(parseCommand('LEFT')).toEqual(true);
  expect(parseCommand('Right')).toEqual(true);
  expect(parseCommand('REPORT')).toEqual(true);
});
