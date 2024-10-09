# Push Notification PWA

## Como Rodar a Aplicação

1. Navegue até o diretório do projeto:
    ```sh
    cd push-notification-pwa
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie a aplicação:
    ```sh
    npm start
    ```

## Configuração do Backend

O backend já está rodando na nuvem no DigitalOcean.

## Configuração do OneSignal

Para que a função de notificação do OneSignal funcione, é necessário alterar o `AppID` no código para um `AppID` gerado na plataforma OneSignal. Além disso, é preciso fazer o deploy do PWA para obter a URL e configurá-la no OneSignal.

## Conclusão

### Push Notification:

1. **Com Node.js e Service Worker:**
    - Funciona no navegador do computador, apenas com o navegador aberto (não é necessário estar no site da aplicação).
    - Funciona no navegador do Android.
    - Funciona no PWA (mesmo em segundo plano ou com o app fechado).
    - Observação: No iOS, o Chrome não tem acesso ao Push Notification e o Safari só tem acesso caso o app seja um PWA instalado.

2. **Com OneSignal:**
    - Funciona no navegador do computador, apenas com o navegador aberto.
    - Funciona no navegador do Android.
    - Funciona apenas no PWA do iOS.
    - Após instalar o PWA no Android, ele para de funcionar tanto no navegador quanto no aplicativo.

Notificações em PWA oferecem uma maneira eficiente de manter os usuários informados e engajados, mesmo quando não estão ativamente usando a aplicação. No entanto, é importante estar ciente das limitações e comportamentos específicos em diferentes plataformas e navegadores.