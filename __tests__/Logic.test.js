import { place, move, left, right, report } from '../src/Logic';

test('Test toy robot placing and movement - Positive #1 ', () => {
  place(0, 0, 'NORTH');
  move();
  expect(report().msg).toEqual('0,1,NORTH');
});

test('Test toy robot placing and movement - Positive #2 ', () => {
  place(0, 0, 'NORTH');
  left();
  expect(report().msg).toEqual('0,0,WEST');
});

test('Test toy robot placing and movement - Positive #3 ', () => {
  place(1, 2, 'EAST');
  move();
  move();
  left();
  move();
  expect(report().msg).toEqual('3,3,NORTH');
});

test('Test invalid toy robot placing', () => {
  expect(place(-1, 0, 'EAST')).toEqual({
    errMsg: 'Out of bound x position spoecified. -1',
    isOK: 0
  });
  expect(place(0, -1, 'EAST')).toEqual({
    errMsg: 'Out of bound y position spoecified. -1',
    isOK: 0
  });
  expect(place(5, 0, 'EAST')).toEqual({
    errMsg: 'Out of bound x position spoecified. 5',
    isOK: 0
  });
  expect(place(0, 5, 'EAST')).toEqual({
    errMsg: 'Out of bound y position spoecified. 5',
    isOK: 0
  });
  expect(place(0, 4, 'BLAH')).toEqual({
    errMsg: 'Incorrect f direction specified. BLAH',
    isOK: 0
  });
});

test('Test toy robot placing and movement - Edge testing', () => {
  place(0, 0, 'EAST');
  for (let i = 0; i < 5; i++) move();
  expect(report().msg).toEqual('4,0,EAST');
  right();
  move();
  expect(report().msg).toEqual('4,0,SOUTH');
  right();
  right();
  for (let i = 0; i < 5; i++) move();
  expect(report().msg).toEqual('4,4,NORTH');
  left();
  for (let i = 0; i < 5; i++) move();
  expect(report().msg).toEqual('0,4,WEST');
  left();
  for (let i = 0; i < 5; i++) move();
  expect(report().msg).toEqual('0,0,SOUTH');
});
