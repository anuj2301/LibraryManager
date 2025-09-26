@echo off
REM Run all microservices in separate windows
setlocal
set BASEDIR=%~dp0\microservices

start "Eureka Server" cmd /k "cd /d %BASEDIR%\eureka-server && mvn spring-boot:run"
start "API Gateway" cmd /k "cd /d %BASEDIR%\api-gateway && mvn spring-boot:run"
start "Auth Service" cmd /k "cd /d %BASEDIR%\auth-service && mvn spring-boot:run"
start "Book Service" cmd /k "cd /d %BASEDIR%\book-service && mvn spring-boot:run"
start "Student Service" cmd /k "cd /d %BASEDIR%\student-service && mvn spring-boot:run"

REM Add more microservices here if needed

echo All microservices are starting in separate windows.
pause
