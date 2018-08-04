import {ToyRobot, DirectionTypes, StringToDirection, DirectionToString } from '../src/Robot'

describe('Toy Robot unit tests', () => {

  test('place the toy robot', (done) => {
    var mockToyRobot = new ToyRobot();
    mockToyRobot.place(0, 0, DirectionTypes.NORTH);
    expect(mockToyRobot.report()).toEqual('0,0,NORTH');

    expect(() => mockToyRobot.place(0, 10, DirectionTypes.NORTH)).toThrowError('Out of bound y position spoecified. 10');

    expect(() => mockToyRobot.place(10, 0, DirectionTypes.NORTH)).toThrowError('Out of bound x position spoecified. 10');

    done();
  });

  test('string to direction', (done) => {
    expect(StringToDirection('east')).toEqual(DirectionTypes.EAST);
    expect(StringToDirection('East')).toEqual(DirectionTypes.EAST);
    expect(StringToDirection('WEST')).toEqual(DirectionTypes.WEST);
    expect(StringToDirection('North')).toEqual(DirectionTypes.NORTH);
    expect(StringToDirection('SOUTH')).toEqual(DirectionTypes.SOUTH);
    expect(() => StringToDirection('dummy')).toThrowError('Invalid direction.');
    done();
  });

  test('direction to string', (done) => {
    expect(DirectionToString(DirectionTypes.EAST)).toEqual('EAST');
    expect(DirectionToString(DirectionTypes.WEST)).toEqual('WEST');
    expect(DirectionToString(DirectionTypes.NORTH)).toEqual('NORTH');
    expect(DirectionToString(DirectionTypes.SOUTH)).toEqual('SOUTH');
    done();
  });

  test('move a step', (done) => {
    var mockToyRobot = new ToyRobot();
    done();
  });

  test('turn left', (done) => {
    done();
  });

  test('turn right', (done) => {
    done();
  });


  test('move to the boundary', (done) => {
    done();
  });


});




