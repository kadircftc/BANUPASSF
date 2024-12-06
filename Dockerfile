# Temel .NET imajlarını kullanarak uygulama için ortam kuruyoruz
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build aşaması - SDK kullanıyoruz
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["WebAPI/WebAPI.csproj", "WebAPI/"]
COPY ["Business/Business.csproj", "Business/"]
COPY ["DataAccess/DataAccess.csproj", "DataAccess/"]
COPY ["Core/Core.csproj", "Core/"]
COPY ["Entities/Entities.csproj", "Entities/"]
RUN dotnet restore "WebAPI/WebAPI.csproj"
COPY . . 
WORKDIR "/src/WebAPI"
RUN dotnet build "WebAPI.csproj" -c Release -o /app/build

# Burada dotnet-ef aracı yüklü
RUN dotnet tool restore

FROM build AS publish
RUN dotnet publish "WebAPI.csproj" -c Release -o /app/publish

# Final aşama - Runtime imajı kullanıyoruz, sadece uygulama çalıştıracak
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Ağa katılmak için entrypoint ekliyoruz ve migration'ı başlatıyoruz
#ENTRYPOINT ["dotnet", "ef", "database", "update"]

# Uygulamayı başlatıyoruz
CMD ["dotnet", "WebAPI.dll"]
