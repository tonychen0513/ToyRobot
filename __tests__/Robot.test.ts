import { ToyRobot, DirectionTypes } from '../src/Robot'

describe('Toy Robot unit test', () => {

  test('place the toy robot', (done) => {
    var mockToyRobot = new ToyRobot(5, 5);
    mockToyRobot.place(0, 0, DirectionTypes.NORTH);
    expect(mockToyRobot.report()).toEqual('0,0,NORTH');
  });

  test('move a step', (done) => {
    var mockToyRobot = new ToyRobot(5, 5);

  });

  test('turn left', (done) => {

  });

  test('turn right', (done) => {

  });


  test('move to the boundary', (done) => {

  });


});




