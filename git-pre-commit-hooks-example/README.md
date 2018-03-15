# Git Pre-Commit Hooks Example

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Example of how to create and include git pre-commit hooks in any project using git as its repository.

## Git Hooks

Any project using git as its repository has a `.git` hidden folder in its root folder. This folder is used by git to store all the 
repository relevant information about the project. Inside the `.git` folder we can create a `hooks` folder, with runnable bash scripts,
which will be automatically recognised by git. Any time we perform certain git actions, the execution of those scripts is triggered
and based on their execution result, the git commands are executed or not.

For further details and a complete list of all Git hooks available, please read the 
[8.3 Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) chapter in Git official documentation.

## Pre-Commit Hook

A pre-commit hook is a bash script. In our `hooks/pre-commit` file we have the following:

```bash
### The task to be run in the command line. This task must be defined in our project.
### The following task is an example.
npm run lint:css

### The variable EXIT_CODE will be defined with the task execution result.
EXIT_CODE=$?

### If the EXIT_CODE is different than 0 (zero) then something went wrong 
### and the Git commit will not be performed.
if [[ ${EXIT_CODE} -ne 0 ]]; then
    echo "[ERRROR] code = " ${EXIT_CODE}
    echo "Lint:CSS detected syntax problems."
    echo "Commit aborted."
    exit 1
else
	echo "Lint:CSS completed successfully\n"
fi
```

## Installation

Copy the `hooks` folder and its contents to the target project `.git` folder. Make sure you have hidden files and folders visible in 
your OS so you can see the `.git` folder. Now, any time a commit is made, the `hooks/pre-commit` bash script will be executed and its
result displayed in the output console.

## Contributors

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>

**Emanuel Lopes**

* <https://bitbucket.org/emanuellopes>
* <https://github.com/emanuellopes>
* <https://facebook.com/emanuel.lopes.pt>
* <https://twitter.com/emanuelxpt>

## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
