import RobotBoard from '../src/RobotBoard'

describe('Toy Robot Board unit tests', () => {
  test("x position valid/invalid test", (done) => {
    expect(RobotBoard.isXAllowed(0)).toEqual(true);
    expect(RobotBoard.isXAllowed(4)).toEqual(true);
    expect(RobotBoard.isXAllowed(-1)).toEqual(false);
    expect(RobotBoard.isXAllowed(5)).toEqual(false);
    done();
  });

  test("y position valid/invalid test", (done) => {
    expect(RobotBoard.isYAllowed(0)).toEqual(true);
    expect(RobotBoard.isYAllowed(4)).toEqual(true);
    expect(RobotBoard.isYAllowed(-1)).toEqual(false);
    expect(RobotBoard.isYAllowed(5)).toEqual(false);
    done();
  });
});