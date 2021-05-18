FROM timbru31/java-node as frontend
WORKDIR /app
COPY ./Frontend .
RUN npm i && npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder
WORKDIR /sources
COPY . .
COPY --from=frontend /app/build /sources/wwwroot
RUN dotnet restore ./
RUN dotnet publish ./Crowdfunding.csproj  --output /app/ --configuration Release

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=builder /app .

CMD ["dotnet", "Crowdfunding.dll"]
