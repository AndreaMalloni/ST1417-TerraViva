# ST1417-TerraViva
Progetto sviluppato dagli studenti [Daniele Monaldi](https://github.com/danielemonaldi), [Andrea Malloni](https://github.com/AndreaMalloni) e [Francesca Morici](https://github.com/Frangiosc) per il conseguimento della prima parte dell'esame di **Applicazioni Web, Mobile e Cloud** del corso di Informatica per la comunicazione digitale (A.A. 2023-2024).

## Descrizione del progetto
### Premesse
Il progetto realizzato e contenuto  in questo repository è un'interfaccia web relativa ad una piattaforma di valorizzazione territoriale per comuni italiani. Esso rappresenta unicamente la porzione di **frontend** della piattaforma, tutta la logica ed in generale il **backend**, compresa gestione del databse, fanno riferimento al progetto [ST0496-TerraViva](https://github.com/danielemonaldi/ST0496-TerraViva).
### Feature
La piattaforma consente, a residenti del territorio e non, di contribuire alla valorizzaione del territorio tramite la pubblicazione di contenuti di tipo informativo, culturale o semplicemente turistico, l'evidenziazione di luoghi del territorio di particolare interesse/valore e attraverso la pubblicazione di itinerari di visita locale personalizzati.
Si tenga presente che la piattaforma è stata realizzata in maniera semplicistica, tenendo in considerazione la possibilita' di gestire **un singolo** territorio comunale.


## Tecnologie e Strumenti
L'applicazione è stata realizzata sotto forma di SPA, utilizzando il framework Angular e facendo affidamento su diverse librerie:

- [ng-bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap): libreria di componenti responsive preconfigurati.
- [auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt): modulo Angular per l'utilizzo di JSON Web Token (JWT).
- [leaflet](https://www.npmjs.com/package/leaflet): libreria JavaScript impiegata per l'implementazione della mappa interattiva del territorio gestito e delle feature ad essa correlate.
- [cripto-js](https://www.npmjs.com/package/crypto-js): libreria per la cifratura SHA256. Viene impiegata per la cifratura della password dell'utente nei contesti di autenticazione e registrazione.

### Problematiche di sicurezza
- **CORS**: Il Cross-origin Resource Sharing  è stato gestito in maniera piuttosto semplice tramite l'impiego di un **proxy** lato client, configurato nel file [proxy.conf.json](src/proxy.conf.json). Naturalmente si tratta di una configurazione fatta al puro scopo di sviluppo dati i fini non commerciali del progetto.
- **SQL Injections**: la problematica è stata risolta alla radice, in quanto non viene eseguito alcun tipo di query "manualmente", ma tutte le interazioni con il database avvengono tramite le **JPA**, e quindi automaticamente generate dal framework. Vedi  [ST0496-TerraViva](https://github.com/danielemonaldi/ST0496-TerraViva).

## Note
Rispetto alla specifica iniziale del progetto [ST0496-TerraViva](https://github.com/danielemonaldi/ST0496-TerraViva) è stato implementato un set ristretto di funzionalità, quantomeno lato frontend, a causa di una banale mancanza di tempo utile. Tale set include:

- Autenticazione
- Registrazione di un nuovo account
- Creazione di punti di rilievo
- Visualizzazione di dettagli relativi a singolo punto

Il backend supporta in ogni caso tutte le specifiche fornite nella sezione delle feature.
