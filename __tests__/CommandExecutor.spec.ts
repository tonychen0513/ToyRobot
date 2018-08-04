import CommandExecutor from '../src/CommandExecutor';
import { ToyRobot } from '../src/Robot';

describe ('CommandExecutor unit test', () => {
  let mockRobot: ToyRobot;
  let mockExecutor: CommandExecutor;

  beforeEach(() => {
    mockRobot = new ToyRobot();
    mockExecutor = new CommandExecutor(mockRobot);
  });

  test('Test interactive command parser', () => {
    // Invalid command
    expect(mockExecutor.execute('Invalid command')).toEqual(false);
    expect(mockExecutor.execute('place 0,3')).toEqual(false);
  });

  test('test place command', () => {
    ToyRobot.prototype.place = jest.fn().mockImplementationOnce(() => {
      // Do nothing.
    });
    expect(mockExecutor.execute('PLACE 0 0 EAST')).toEqual(true);
    expect(mockRobot.place).toHaveBeenCalledTimes(1);
  });

  test('test lower case place command', () => {
    ToyRobot.prototype.place = jest.fn().mockImplementationOnce(() => {
      // Do nothing.
    });
    expect(mockExecutor.execute('place 0 3 WEST')).toEqual(true);
    expect(mockRobot.place).toHaveBeenCalledTimes(1);
  });

  test('test move command', () => {
    ToyRobot.prototype.move = jest.fn().mockImplementationOnce(() => {
      // Do nothing.
    });
    expect(mockExecutor.execute('move')).toEqual(true);
    expect(mockRobot.move).toHaveBeenCalledTimes(1);
  });

  test('test left command', () => {
    ToyRobot.prototype.turnLeft = jest.fn().mockImplementationOnce(() => {
      // Do nothing.
    });
    expect(mockExecutor.execute('LEFT')).toEqual(true);
    expect(mockRobot.turnLeft).toHaveBeenCalledTimes(1);
  });

  test('test right command', () => {
    ToyRobot.prototype.turnRight = jest.fn().mockImplementationOnce(() => {
      // Do nothing.
    });
    expect(mockExecutor.execute('RIGHT')).toEqual(true);
    expect(mockRobot.turnRight).toHaveBeenCalledTimes(1);
  });

  test('test report command', () => {
    ToyRobot.prototype.report = jest.fn().mockImplementationOnce((): string => {
      return '';
    });
    expect(mockExecutor.execute('REPORT')).toEqual(true);
    expect(mockRobot.report).toHaveBeenCalledTimes(1);
  });
});


