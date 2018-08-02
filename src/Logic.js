import fs from 'fs';

const DirectionTypes = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  WEST: 'WEST',
  SOUTH: 'SOUTH'
};
const TableMaxY = 5;
const TableMaxX = 5;

const ToyRobotFile = 'toyRobotData.json';

function serializeToyRobot(toyRobotObj) {
  const s = JSON.stringify(toyRobotObj);
  try {
    fs.writeFileSync(ToyRobotFile, s);
  } catch (err) {
    return { isOK: 0, errMsg: `Serialize toy robot error: ${err}` };
  }
  return { isOK: 1, errMsg: '' };
}

function deSerializeToyRobot() {
  let toyRobotObj = {};
  try {
    toyRobotObj = JSON.parse(fs.readFileSync(ToyRobotFile, 'utf8'));
  } catch (err) {
    return {
      isOK: 0,
      obj: {},
      errMsg: `Cannot locate the toy robot. Have you placed the toy robot yet?`
    };
  }
  return { isOK: 1, obj: toyRobotObj, errMsg: '' };
}

export const place = (x, y, f) => {
  const xNum = Number(x);
  const yNum = Number(y);
  const fDirUpperCase = f.toUpperCase();
  let errorMsg = '';
  if (Object.keys(DirectionTypes).indexOf(fDirUpperCase) === -1) {
    errorMsg = `Incorrect f direction specified. ${f}`;
    return { isOK: 0, errMsg: errorMsg };
  }
  if (xNum < 0 || xNum >= TableMaxX) {
    errorMsg = `Out of bound x position spoecified. ${x}`;
    return { isOK: 0, errMsg: errorMsg };
  }
  if (yNum < 0 || yNum >= TableMaxY) {
    errorMsg = `Out of bound y position spoecified. ${y}`;
    return { isOK: 0, errMsg: errorMsg };
  }

  const toyRobotObj = {
    xPos: xNum,
    yPos: yNum,
    fDir: fDirUpperCase
  };
  return serializeToyRobot(toyRobotObj);
};

export const move = () => {
  const retVal = deSerializeToyRobot();
  if (!retVal.isOK) {
    return { isOK: 0, errMsg: retVal.errMsg };
  }

  const toyRobotObj = retVal.obj;
  const xNum = Number(toyRobotObj.xPos);
  const yNum = Number(toyRobotObj.yPos);
  if (toyRobotObj.fDir === DirectionTypes.EAST) {
    if (xNum < TableMaxX - 1) {
      toyRobotObj.xPos = xNum + 1;
    }
  } else if (toyRobotObj.fDir === DirectionTypes.WEST) {
    if (xNum > 0) {
      toyRobotObj.xPos = xNum - 1;
    }
  } else if (toyRobotObj.fDir === DirectionTypes.NORTH) {
    if (yNum < TableMaxY - 1) {
      toyRobotObj.yPos = yNum + 1;
    }
  } else if (toyRobotObj.fDir === DirectionTypes.SOUTH) {
    if (yNum > 0) {
      toyRobotObj.yPos = yNum - 1;
    }
  }

  return serializeToyRobot(toyRobotObj);
};

const LeftTurn = {
  EAST: 'NORTH',
  NORTH: 'WEST',
  WEST: 'SOUTH',
  SOUTH: 'EAST'
};

const RightTurn = {
  EAST: 'SOUTH',
  SOUTH: 'WEST',
  WEST: 'NORTH',
  NORTH: 'EAST'
};

export const left = () => {
  const retVal = deSerializeToyRobot();
  if (!retVal.isOK) {
    return { isOK: 0, errMsg: retVal.errMsg };
  }

  const toyRobotObj = retVal.obj;
  toyRobotObj.fDir = LeftTurn[toyRobotObj.fDir];
  return serializeToyRobot(toyRobotObj);
};

export const right = () => {
  const retVal = deSerializeToyRobot();
  if (!retVal.isOK) {
    return { isOK: 0, errMsg: retVal.errMsg };
  }

  const toyRobotObj = retVal.obj;
  toyRobotObj.fDir = RightTurn[toyRobotObj.fDir];
  return serializeToyRobot(toyRobotObj);
};

export const report = () => {
  const retVal = deSerializeToyRobot();
  if (!retVal.isOK) {
    return { isOK: 0, errMsg: retVal.errMsg, msg: '' };
  }

  const toyRobotObj = retVal.obj;
  return {
    isOK: 1,
    errMsg: '',
    msg: `${toyRobotObj.xPos},${toyRobotObj.yPos},${toyRobotObj.fDir}`
  };
};
