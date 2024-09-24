const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Replace '/dev/ttyUSB0' with your serial port path (it could be COM1, COM3 on Windows)
const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600 // Adjust the baud rate as necessary
});

// Create a parser to read incoming data as lines
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Open errors will be emitted as an error event
port.on('error', (err) => {
    console.log('Error: ', err.message);
});

// When the port is opened successfully
port.on('open', () => {
    console.log('Serial port opened');
});

// Read data from the serial port
parser.on('data', (data) => {
    console.log('Received:', data);
});

// Function to send data to the serial port
const sendData = (data) => {
    port.write(data, (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('Data sent:', data);
    });
};

// Example of sending data every 5 seconds
setTimeout(() => {
    sendData('Hello from Node.js\n');
}, 5000);
