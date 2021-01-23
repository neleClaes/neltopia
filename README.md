# Software Security - web applicatie

Webhost: www.neltopia.com

 ## Laravel React project

Eerst heb ik me bezig gehouden om een fornt-end react backend laravel applicatie te maken. Lokaal werkt deze zoals gewenst maar op de webhost wou de front-end niet laden.

### HTTPS

* op de webhosting word gebruik gemaakt van een Let's Encrypt certificaat.
* HTTPS wordt geforceerd.

### Registratie

* een gebruikersnaam, email, password en password confirmatie wordt gebruikt om de gebruiker te registreren. Deze worden dan geverifieerd (in Laravel-React\resources\js\components\Form\validateinfo.js)
  * lengte password is minstens 7 charters lang.
  * Passwoord kan enkel ui printbare ASCII characters bestaan.
  * HIBP API wordt aangesproken om te zien of er al meer dan 300 lekken zijn van dat wachtwoord.
  * Het wachtwoord kan gecreëerd worden door een password manager.
  * Alle velden zijn verplicht om in te vullen
* Wanneer aan de vorige vereiste voldaan zijn, wordt een axios API call opgesteld naar de back-end (in Laravel-React\resources\js\api\User.js)
  * Voor dat de gegevens worden doorgestuurd, wordt het password verandert door bcryptjs
* Vervolgens gaat de back-end de user opslaan in de database in (Laravel-React\app\Http\Controllers\UserController.php)

### Aanmelden

* Een automatische mail wordt verstuurd naar de gebruiker die dan eerst deze moet veriferen voor dat hij daadwerkelijk kan aanmelden
* bij herhaalde mislukte pogingen kan de user even niet meer inloggen (in  Laravel-React\resources\js\views\Auth\Login\Login.js) door debounce
* Het is mogelijk om een wachtwoord te plakken
* na het aanmelden kan de gebruiker aan zijn Dashbord en zijn gegevens aanpassen, verwijderen, opvragen

### Bescherming persoonlijke gegevens

* Wanneer de user is aangemeld kan deze naar het dashboard gaan. (in Laravel-React\resources\js\views\User\Dashboard\Dashboard.js)
  * Hier kan hij zijn gegevens updaten
  * Ook een .CSV file opslaan met zijn gegevens
  * Zijn account verwijderen

### Extra bescherming

Met dat ik gebruik maak van API calls om de gegevens van front-end naar back-end te brengen heb ik voor de authenticatie van de user een extra middelware check ingevoerd. Deze is terug te vinden in  Laravel-React\app\Http\Middleware\checkHost.php. Dit zorgt ervoor dat de auth API’s enkel aangesproken kunnen worden op de locatie waar de applicatie draait.

## Laravel

Met dat vorige applicatie enkel lokaal werkt heb ik nog snel een laravel project trachten op te zetten. Maar ook hier loopt er iets mis waardoor ik de applicatie niet kan tonen op de webhost.





