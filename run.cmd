echo Installing PostgreSQL...
if not exist "C:\Program Files\PostgreSQL" (
    powershell Invoke-WebRequest "https://get.enterprisedb.com/postgresql/postgresql-20.5-1-windows-x64.exe" -OutFile "postgresql-installer.exe"
    start /wait postgresql-installer.exe --silent
    del postgresql-installer.exe
    net start postgresql
)

echo Checking if PostgreSQL is already started...
if not exist "C:\Program Files\PostgreSQL\pgsql\bin\pg_ctl.exe" (
    echo Starting PostgreSQL...
    if not exist "C:\ProgramData\PostgreSQL\pgsql\data" (
        "C:\Program Files\PostgreSQL\pgsql\bin\initdb.exe" "C:\ProgramData\PostgreSQL\pgsql\data"
    )
    "C:\Program Files\PostgreSQL\pgsql\bin\pg_ctl.exe" -D "C:\ProgramData\PostgreSQL\pgsql\data" -l logfile start
)

echo Checking if database already exists...
if not exist "C:\ProgramData\PostgreSQL\pgsql\data\eventdb" (
    if not "C:\Program Files\PostgreSQL\pgsql\bin\psql.exe" -U postgres -p 5432 -c "\l" | findstr "eventdb" (
        echo Creating database...
        if not "C:\Program Files\PostgreSQL\pgsql\bin\psql.exe" -U postgres -p 5432 -c "\du" | findstr "eventdb" (
            "C:\Program Files\PostgreSQL\pgsql\bin\psql.exe" -U postgres -p 5432 -c "CREATE USER eventdb WITH PASSWORD 'eventdb';"
        )
        "C:\Program Files\PostgreSQL\pgsql\bin\psql.exe" -U postgres -p 5432 -c "CREATE DATABASE eventdb;"
        "C:\Program Files\PostgreSQL\pgsql\bin\psql.exe" -U postgres -p 5432 -c "GRANT ALL PRIVILEGES ON DATABASE eventdb TO eventdb;"
    )
)

echo Installing Java 17...
if not exist "C:\ProgramData\Oracle\Java" (
    powershell Invoke-WebRequest "https://download.java.net/java/GA/jdk17/9/GPL/openjdk-17_windows-x64_bin.zip" -OutFile "jdk.zip"
    powershell Expand-Archive jdk.zip "C:\ProgramData\Oracle\Java"
    setx PATH "%PATH%;C:\ProgramData\Oracle\Java\jdk-17\bin"
    del jdk.zip
)

echo Running backend jar...
cd event-service
start /b java -jar target/event-service-1.0.0-SNAPSHOT.jar

echo Installing Node...
if not exist "C:\Program Files\nodejs" (
    powershell Invoke-WebRequest "https://nodejs.org/dist

echo Installing dependencies...
cd ../event-app
npm install

echo Running frontend...
npm start
echo Done!

:kill
taskkill /f /im "java.exe"
taskkill /f /im "node.exe"
goto :eof