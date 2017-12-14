# Nomad 🗺

A web-app that encourages travel through an interactive travel history map and competition with friends. Built with :heart: for UCLA CS 130: Software Engineering.

## Requisites For Running This Application
1. Ensure Node is installed (running `node -v` on command line should return version >=6.0)
2. Install Yarn if not installed already (running `yarn version` on command line should return version >=0.23.4)
3. Ensure MongoDB is installed (running `mongod --version` on command line should return version >=3.2.0)
4. Get `.env` file from one of the contributors and place it in root. (This file contains API keys and secrets and has not been uploaded on Github)

## Running the Application
1. Run `git clone [This Repository]` and cd into the folder. 
2. Run `sudo mongod` and keep it in the background
3. In a new terminal window, run `yarn install`.
4. Once yarn install is complete, run `yarn start`
5. Go to [localhost:8000](localhost:8000).

## Generating jsdoc 
1. Run 'npm install jsdoc' to download the software
2. Run 'jsdoc filename' to generate the jsdoc
3. This will generate a /out folder in the current directory.
4. Run 'cd out' and 'open index.html' to see all jsdocs. If you would like to see individual files look at the filename.js.html instead
Reach out to anybody on the team regarding questions or concerns.