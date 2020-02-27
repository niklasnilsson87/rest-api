# Release

In this file, you indicate the status of your assignment by checking the checkboxes below. No unchecked checkboxes are allowed in the document when your hand in for an assessment.

## Release status

_To make a release that will be assessed by the examiner, you need to make sure all checkboxes below are checked. You check a checkbox by adding an "x" within the brackets._

- [x] I have started working on the assignment.
- [x] All functional requirements are met.
- [x] All non-functional requirements are met.
- [x] I have completed the assignment report (see below).
- [x] README.md contains instructions on how to test the API

---

- [x] I intend to submit the assignment, and at the same time, I guarantee that I am the one who created the code that is submitted. In cases where I use external libraries or borrowed code from other sources, the source is clearly stated.
(_Jag avser göra en inlämning av uppgiften och jag garanterar samtidigt att jag är den som skapat koden som lämnas in. I de fall jag använder externa bibliotek eller har lånat kod från andra källor så är källan tydligt angiven._)

---

## Assignment report

Jag har byggt ett REST api för hatering av spelare för agenter. Agenter kan använda sig av apiet för att hålla koll på vilka spelare som finns i deras stall. 
Uppgifter i sig, med att sätta upp ett api för att skicka data har jag gjort tidigare men denna gång tänkte man över många saker flera gånger. Exempelvis vilka statuskoder man ska använda sig av
vilka headers som ska skickas med osv. Strukturen tycker jag att jag fick till riktigt bra. Jag valde att separera ut Response till en egen module som anropar funktioner med statuskodnamn som vid eventuell testing
skulle komma till hands.

### HATEOAS

Jag har implementerat HATEOAS i roten på applikationen där man kan navigera till de olika urelerna som finns samt metoder till apiet. 
Där hittar man också en beskrivning av varje route och om den kräver authensiering eller ej. Jag gillar att man skriver ut hur man ska skicka sin data till en viss route.
I varje response man får tillbaka så har jag implementerat en *self*-, *root*- och *subscribe*-route under links som gör att man kan följa dessa ifall man önskar. Gör använderen något fel kan man
alltid navigera sig tillbaka till roten för att se beskrivningen om den aktuella routen.

### Multiple representations

Iså fall skulle man behöva se headern *Accept* i requesten för att skicka tillbaka det som .json eller .xml eller övrigt.

### Autentication

Jag har använt mig utav JWT som låg med som krav till applikationen. Även om vi kunde ha valt något annat så hade jag hållt mig till JWT-tokens. Eftersom JWTn är signerad med en hemlighet på serversidan 
så kan den vara tillförlitlig. Om JWT har manipulerats så tas den inte emot på serversidan. JTWn kan transportera data som vi kan ha stor användning för och som jag använder det till att transportera användarnamn (agenter)
till att sätta ägarskap till spelare. På så vis kan ingen annan agent ta bort eller manipulera andras spelare.  

I övrigt kan man tänka sig att använda en OAuth lösning för att sköta inloggningen och få en access_token. Även om denna lösning är bra så tycker jag ändå att man måste ha en JWT för att transportera data mellan sina requests.

### Webhooks

Användaren får registrera en url dit de vill få sin hook skickad. Innan den sparas till databasen skickar servern ut en POST till urlen för att se om den får svar. Svarar rlen sparas den tillsammans med användarnamnet och id.
När en agent registrerar en ny spelare till sitt stall skickas spelaren och information om vem och vad som skapades.  

### Further improvments

Skulle vilja få bättre struktur på mina HATEOAS länkar jag skickar med i varje response, Jag sköt mig lite i foten på gott och ont när jag separerade ut Responses till en egen module med egna funktions status.
Ville öka testbarheten i koden genom att sparera ut den och det blir bättre men dock till bekostnad av egenskräddade HATEOAS länkar. Även om jag tycker länkarna är helt okej som följer med så tycker jag mig inte hitta
så mycket som är rätt eller fel gällande vilka länkar som ska följa med i respektive response. Jag skulle också vilja öka testbarheten ännu mer genom att dependecieinjecta databasen så det blir lätt att mocka vid eventuell enhetstestning.

Spelarna kan uppdateras med fler attributer så som värde, lön lastVisited och många fler för att agenten ska kunna få fram mer information angående den specifika spelare. 

### Extras

Igentligen inte mycket mer än att vara noga med att separera ut kod och få en bra struktur. Response modulen blir separerat för lättare enhetstestning.
Jag har produktionssatt applikationen på Heroku så den får en HTTPS cert och fyllt databasen så den blir lättare att testa.

### Feedback

Överlag rolig uppgift som det *bara* var att koda på. Även om vissa saker gick snabbt att sätta upp så var är tiden ett litet bekymmer känner jag.  
Viktigt och bra för oss att få bra hum på statuskoderna, felhantering och vilka response man ska skicka tillbaka till klient.