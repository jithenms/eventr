# Eventr

## Description

Eventr is an app designed to encourage student participation in school events by rewarding them with points for attending events. They can redeem these points for prizes.

We built the user interface with React, a JavaScript framework created by Facebook. React allows for the construction of user interfaces through the use of reusable components, resulting in more efficient and easily maintainable code.

To handle communication between the frontend and the database, we built a GraphQL API with Java and Spring Boot. Spring Boot is a widely-used framework by companies like Netflix, Uber, and Google known for its simplicity and flexibility with minimal configuration.

To store and effectively organize all data in a persistent manner we used PostgreSQL, a robust and reliable database management system for storing relational data.

## How to Run

### For Windows:

1. Select the zip file in the Google drive folder, right-click and choose "Download", then unzip the file when the download is complete to access the project files.

2. Open a web browser and go to the Docker website (https://www.docker.com/). On the Docker homepage, click on the "Get Docker" button. On the next page, click on the "Download" button for "Docker Desktop for Windows". Follow the prompts to install Docker on your computer.

3. Once Docker is installed, open a command prompt window (you can search for "cmd" in the Start menu). In the command prompt window, use the "cd" command to navigate to the directory where you extracted the project files. For example, if you extracted the files to your desktop, you would type "cd Desktop/project-files".

4. Once you are in the correct directory, type in the command "docker-compose up" and press Enter. This will start the services for the project. You should see a message indicating that the services are running. You can now access the services on your local machine. The GUI should be located at http://localhost:3000.

### For Mac:

1. Select the zip file in the Google drive folder, right-click and choose "Download", then unzip the file when the download is complete to access the project files.

2. Open a web browser and go to the Docker website (https://www.docker.com/). On the Docker homepage, click on the "Get Docker" button. On the next page, click on the "Download" button for "Docker Desktop for Mac". Follow the prompts to install Docker on your computer.

3. Once Docker is installed, open a terminal window (you can find this in the Applications > Utilities folder). In the terminal window, use the "cd" command to navigate to the directory where you extracted the project files. For example, if you extracted the files to your desktop, you would type "cd Desktop/project-files".

4. Once you are in the correct directory, type in the command "docker-compose up" and press Enter. This will start the services for the project. You should see a message indicating that the services are running. You can now access the services on your local machine. The GUI should be located at http://localhost:3000.
