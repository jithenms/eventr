# Eventr

## Description

Eventr is an app that aims to increase student engagement and participation in school events. When students attend or participate in these events, they earn points that can be redeemed for prizes like a school reward, a food reward, and a school spirit item. The more points a student has, the bigger the prize they can get.

The user interface of Eventr was built using React Electron, which allows for the creation of desktop GUI applications. Electron is a popular technology that is also used by well-known companies like Slack, Spotify, and Discord. The backend of the app, which handles data and communication between the frontend and the database, was built using Java and Spring Boot. Spring Boot is a widely-used framework used by companies like Netflix, Uber, and Google that makes it easy to create standalone, production-grade server-side applications. It's known for its simplicity and flexibility, making it a great choice for Eventr's backend. The API (Application Programming Interface), or the way that different parts of the app communicate with each other, was implemented using GraphQL, a flexible and efficient way of querying and mutating data. The data for the app is stored in a PostgreSQL database, which is a powerful and reliable tool for organizing and storing relational data.

At the end of each quarter, Eventr generates a report showing the points accumulated by each student in each grade. It also includes a feature to randomly select a winner from each grade level, as well as the student with the highest number of points. The app has a user-friendly GUI with various control types, such as drop-down lists, text fields, and checkboxes, and all data entry is validated with user notification and error messages.

## How to Run

### For Windows:

1. On the GitHub repository page, click on the "Code" button. In the pop-up window, click on the "Download ZIP" button. A download prompt will appear. Select a location on your computer where you want to save the downloaded files and click "Save". Once the download is complete, locate the downloaded ZIP file on your computer and extract it to a location of your choice (e.g. your desktop).

2. Open a web browser and go to the Docker website (https://www.docker.com/). On the Docker homepage, click on the "Get Docker" button. On the next page, click on the "Download" button for "Docker Desktop for Windows". Follow the prompts to install Docker on your computer.

3. Once Docker is installed, open a command prompt window (you can search for "cmd" in the Start menu). In the command prompt window, use the "cd" command to navigate to the directory where you extracted the project files. For example, if you extracted the files to your desktop, you would type "cd Desktop/project-files".

4. Once you are in the correct directory, type in the command "docker-compose up" and press Enter. This will start the services for the project. You should see a message indicating that the services are running. You can now access the services on your local machine. The GUI should be located at http://localhost:3000.

### For Mac:

1. On the GitHub repository page, click on the "Code" button. In the pop-up window, click on the "Download ZIP" button. A download prompt will appear. Select a location on your computer where you want to save the downloaded files and click "Save". Once the download is complete, locate the downloaded ZIP file on your computer and extract it to a location of your choice (e.g. your desktop).

2. Open a web browser and go to the Docker website (https://www.docker.com/). On the Docker homepage, click on the "Get Docker" button. On the next page, click on the "Download" button for "Docker Desktop for Mac". Follow the prompts to install Docker on your computer.

3. Once Docker is installed, open a terminal window (you can find this in the Applications > Utilities folder). In the terminal window, use the "cd" command to navigate to the directory where you extracted the project files. For example, if you extracted the files to your desktop, you would type "cd Desktop/project-files".

4. Once you are in the correct directory, type in the command "docker-compose up" and press Enter. This will start the services for the project. You should see a message indicating that the services are running. You can now access the services on your local machine. The GUI should be located at http://localhost:3000.