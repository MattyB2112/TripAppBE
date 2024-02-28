// const { Server } = require('http');
// const { createSocketIOServer } = require('./socket');
// const ioClient = require('socket.io-client');

// let server;

// beforeAll(() => {
//   server = createSocketIOServer().listen(3000);
// });

// afterAll((done) => {
//   server.close(done);
// });

// describe('Socket connection tests', () => {
// test('User can connect to socket', (done) => {
//     const client = ioClient('http://localhost:3000');

//     client.on('connect', () => {
//         client.disconnect();
//         done();
//     });
// });

// test('User can connect to socket and emit a message', async () => {
//     await new Promise((resolve) => {
//       const client = ioClient('http://localhost:3000');

//       client.on('connect', () => {
//         client.emit('testMessage', { content: 'Hello, Socket!' });
//       });

//       server.on('connection', (socket) => {
//         socket.on('testMessage', (message) => {
//           expect(message.content).toBe('Hello, Socket!');
//           client.disconnect();
//           resolve();
//         });
//       });
//     });
// });

// test('User can join a group', (done) => {
//     const client = ioClient('http://localhost:3000');

//     client.on('connect', () => {
//       client.emit('joinGroup', 'exampleGroup');
//     });

//     server.on('connection', (socket) => {
//       socket.on('joinGroup', (groupName) => {
//         expect(groupName).toBe('exampleGroup');
//         client.disconnect();
//         done();
//       });
//     });
//   });
// });

// describe('Broadcast and Group Message Tests', () => {
//     test('Users can receive a broadcast message', (done) => {
//       const client1 = ioClient('http://localhost:3000');
//       const client2 = ioClient('http://localhost:3000');

//       let count = 0;

//       const finishTest = () => {
//         count++;
//         if (count === 2) {
//           client1.disconnect();
//           client2.disconnect();
//           done();
//         }
//       };

//       client1.on('connect', () => {
//         client1.emit('broadcastMessage', { content: 'Hello, everyone!' });
//         finishTest();
//       });

//       client2.on('broadcastMessage', (message) => {
//         expect(message.content).toBe('Hello, everyone!');
//         finishTest();
//       });
//     }, 15000);

//     test('Users can send and receive group messages', (done) => {
//       const client1 = ioClient('http://localhost:3000');
//       const client2 = ioClient('http://localhost:3000');

//       let count = 0;

//       const finishTest = () => {
//         count++;
//         if (count === 2) {
//           client1.disconnect();
//           client2.disconnect();
//           done();
//         }
//       };

//       client1.on('connect', () => {
//         client1.emit('groupMessage', { groupName: 'exampleGroup', content: 'Hello, everyone!' });
//         finishTest();
//       });

//       client2.on('groupMessage', (message) => {
//         expect(message.content).toBe('Hello, everyone!');
//         finishTest();
//       });
//     }, 15000);
// });
