#!/bin/sh

# Migration'ı bekle ve uygula
dotnet WebAPI.dll --migration

# Uygulamayı başlat
dotnet WebAPI.dll
