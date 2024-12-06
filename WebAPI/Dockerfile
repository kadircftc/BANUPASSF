# Temel .NET imajlarýný kullanarak uygulama için ortam kuruyoruz
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build aþamasý
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

FROM build AS publish
RUN dotnet publish "WebAPI.csproj" -c Release -o /app/publish

# Final aþama
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Aða katýlmak için entrypoint ekliyoruz ve migration'ý baþlatýyoruz
ENTRYPOINT ["dotnet", "ef", "database", "update"]

# Uygulamayý baþlatýyoruz
CMD ["dotnet", "WebAPI.dll"]
