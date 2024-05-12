@break off

echo Deploying front-end...

if exist "public" (
    rmdir /s /q public
    mkdir public
)

cd ../frontend

call npm run build

cd ../backend

xcopy /s "../frontend/dist/url-shortener/browser" "public"

echo Front-end deployed successfully!