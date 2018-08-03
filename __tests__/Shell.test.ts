import { executeCommand } from '../src/Shell';
import { ToyRobot } from '../src/Robot';

test('Test interactive command parser', () => {
  let robot: ToyRobot = new ToyRobot(5, 5);
  // Invalid command
  expect(executeCommand('Invalid command', robot)).toEqual(false);
  // Valid PLACE commands
  expect(executeCommand('PLACE 0 0 EAST', robot)).toEqual(true);
  expect(executeCommand('PLACE 0,3,WEST', robot)).toEqual(true);
  // Invalild place command
  expect(executeCommand('place 0,3', robot)).toEqual(false);
  // Valid commands with lower cases and upper cases
  expect(executeCommand('move', robot)).toEqual(true);
  expect(executeCommand('LEFT', robot)).toEqual(true);
  expect(executeCommand('Right', robot)).toEqual(true);
  expect(executeCommand('REPORT', robot)).toEqual(true);
});
