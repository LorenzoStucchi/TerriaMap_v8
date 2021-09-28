# Script per l'esecuzione automatica di Terria sul Server
La cartella contiene gli script che consentono di trasformare in un processo l'installazione di pm2 e l'avvio e lo stop di TerriaMap.

La cartella contiene le sottocartelle bat, exe e sed. La cartella bat contiene gli script che è possibile lanciare da terminale, la cartella exe gli eseguibili e la cartella sed i file che hanno trasformato i bat in exe.

## Script

### Terria_pm2_install
```
npm install pm2 -g
```

### Terria_Start
```
pm2 start C:\TerriaMap\ecosystem-production.config.js --update-env --env production
```

### Terria_Stop
```
pm2 stop all
```

### Terria_Reboot
```
pm2 stop all
pm2 start C:\TerriaMap\ecosystem-production.config.js --update-env --env production
```

## Servizi
Il servizio è possibile crearlo tramite PowerShell. Poisizionandosi nella cartella `script\exe` e eseguendo il comando
```
New-Service -Name "YourServiceName" -BinaryPathName <yourproject>.exe
```
Più info nella [guida](https://docs.microsoft.com/it-it/dotnet/framework/windows-services/how-to-install-and-uninstall-services#install-using-powershell) di Microsoft.