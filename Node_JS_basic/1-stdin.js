process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`);
});

process.on('exit', () => {
  console.log('This important software is now closing');
});

process.stdin.on('end', () => {
  process.exit();
});
