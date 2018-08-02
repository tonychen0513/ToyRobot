Toy Robot Simulator

ToyRobot is a command line tool that places and move the toy robot on a square tabletop of dimensions 5 units x 5 units.

Usage
-----------

- Command Mode

  - Print the help of the ToyRobot:

        ToyRobot
    or

        ToyRobot --help

  - PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. X and Y should be in the range of [0,4].
  
        ToyRobot PLACE 0 0 EAST

  - MOVE will move the toy robot one unit forward in the direction it is currently facing.

        ToyRobot MOVE

  - LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

        ToyRobot RIGHT
        ToyRobot LEFT
  
  - REPORT will announce the X,Y and F of the robot.

        ToyRobot REPORT
    The output is a comma separated string, e.g. 0,0,EAST.

- Interactive mode

  The command line tool can be used in the interactive mode by input:

      ToyRobot -i
    or

      ToyRobot --interactive

  Then the folowing instructions will appear:

      Enter the interactive mode! Please enter your instructions. Type "exit" to exit the command.
      >

  You can type in the above commands in the interactive modes. The command name is case-insensitive in the interactive mode. The arguments could be separated by '.' or ' '. Here are some examples:

      PLACE 0,1,WEST
      place 0 0 EAST
      move
      Right
      Left
      REPORT

Installation
---------

- Prerequisite
  
  A javascript package management tool such as Yarn or npm will be needed. Here it is assumed that Yarn has been installed for the package management.

- First of all, download the package and put it into a folder;
- Then download all the dependent packages by running:

      yarn

- Build the project, by running:

      yarn build

- Finally, deploy the tool as a global command line tool:

      yarn deploy

Testing
---------

Unit testing can be executed via the help of yarn:

    yarn test
