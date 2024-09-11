const { exec } = require('child_process');

// Get the commit message from command line arguments
const message: string = process.argv[2] || ''; // Initialize with an empty string if undefined

if (!message) {
  console.error('Please provide a commit message.');
  process.exit(1);
}

// Function to execute a command
const runCommand = (command: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error: Error, stdout: string, stderr: string) => {
      if (error) {
        reject(`Error: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

// Execute Git commands
(async () => {
  try {
    await runCommand('git add .');
    await runCommand(`git commit -m "${message}"`);
    await runCommand('git push');
    console.log('Commit successful and changes pushed!');
  } catch (error: unknown) {
    console.error(error);
  }
})();
