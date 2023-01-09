#! /bin/bash

echo Installing PostgreSQL...
if [ ! -d "/usr/local/pgsql" ]; then
brew install postgresql
brew services restart postgresql
fi

echo Checking if PostgreSQL is already started...
if ! pgrep -x "postgres" > /dev/null; then
echo Starting PostgreSQL...
if [ ! -d "/usr/local/var/postgres" ]; then
initdb /usr/local/var/postgres
fi
pg_ctl -D /usr/local/var/postgres -l logfile start
fi

echo Checking if database already exists...
if [ ! -d "/usr/local/var/postgres/eventdb" ]; then
if ! psql -U postgres -p 5432 -c "\l" | grep -q "eventdb"; then
echo Creating database...
if ! psql -U postgres -p 5432 -c "\du" | grep -q "eventdb"; then
psql -U postgres -p 5432 -c "CREATE USER eventdb WITH PASSWORD 'eventdb';"
fi
psql -U postgres -p 5432 -c "CREATE DATABASE eventdb;"
psql -U postgres -p 5432 -c "GRANT ALL PRIVILEGES ON DATABASE eventdb TO eventdb;"
fi
fi

echo Installing Java 17...
if [ ! -d "/Library/Java" ]; then
brew cask install java
fi

echo Running backend jar...
cd event-service
java -jar target/event-service-1.0.0-SNAPSHOT.jar &
BACKEND_PID=$!

echo Installing Node...
if [ ! -d "/usr/local/lib/node_modules" ]; then
brew install node
fi
echo Installing dependencies...
cd ../event-app
npm install
Run frontend
echo Running frontend...
npm start
echo Done!

trap "kill $BACKEND_PID" EXIT