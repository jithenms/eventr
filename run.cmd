echo Installing PostgreSQL...
if not exist "C:\Program Files\PostgreSQL" (
    if not exist "%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe" (
        @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    )
    choco install postgresql --version=20.5.1 --yes
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
    if not exist "%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe" (
        @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    )
    choco install openjdk --version=17 --yes
    setx PATH "%PATH%;C:\ProgramData\Oracle\Java\jdk-17\bin"
)

echo Running backend jar...
cd event-service
java -jar target/event-service-1.0.0-SNAPSHOT.jar

echo Installing Node...
if not exist "C:\Program Files\nodejs" (
    if not exist "%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe" (
        @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    )
    choco install nodejs --yes
)

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