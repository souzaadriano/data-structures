cat .setup/.base.env > .env
echo "Created dotenv file at project root directory."
echo "\n"
echo "installing dependencies"
yarn install
echo "all dependencies instaled"
echo "\n"
echo "creating database"
docker compose up -d
echo "database created"
echo "\n"
