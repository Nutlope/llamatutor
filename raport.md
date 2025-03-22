# Raport z analizy projektu Llama Tutor

 ## 1. Wprowadzenie
 Projekt Llama Tutor to aplikacja AI, która wykorzystuje model Llama 3 70B i Together.ai do generowania odpowiedzi. Projekt jest zbudowany przy użyciu Next.js i Tailwind CSS.

 ## 2. Technologie
 *   **LLM:** Llama 3 70B (Meta), Together AI
 *   **Framework:** Next.js
 *   **Stylizacja:** Tailwind CSS
 *   **Wyszukiwanie:** Serper (lub Azure Bing Search API)
 *   **Obserwacja:** Helicone
 *   **Analityka:** Plausible
 *   **Inne:**
     *   @headlessui/react
     *   @mozilla/readability
     *   eventsource-parser
     *   jsdom
     *   llama3-tokenizer-js
     *   openai
     *   react
     *   react-dom
     *   react-hot-toast
     *   react-markdown
     *   together-ai
     *   zod
     *   zod-to-json-schema

 ## 3. Struktura plików
 Projekt jest zorganizowany w następujący sposób:
 *   `app/`: Główny katalog aplikacji Next.js, zawierający strony i układy.
     *   `app/layout.tsx`: Główny układ aplikacji.
     *   `app/page.tsx`: Strona główna.
     *   `app/api/`: Katalog z endpointami API.
         *   `app/api/getChat/route.ts`: Obsługa czatu.
         *   `app/api/getParsedSources/route.ts`: Pobieranie przetworzonych źródeł.
         *   `app/api/getSources/route.ts`: Pobieranie źródeł.
 *   `components/`: Katalog z komponentami React.
     *   `components/Chat.tsx`: Komponent czatu.
     *   `components/FinalInputArea.tsx`: Komponent obszaru wejściowego.
     *   `components/Footer.tsx`: Komponent stopki.
     *   `components/Header.tsx`: Komponent nagłówka.
     *   `components/Hero.tsx`: Komponent sekcji hero.
     *   `components/InitialInputArea.tsx`: Komponent początkowego obszaru wejściowego.
     *   `components/logo.tsx`: Komponent logo.
     *   `components/Sources.tsx`: Komponent źródeł.
     *   `components/TypeAnimation.tsx`: Komponent animacji pisania.
 *   `public/`: Katalog z zasobami publicznymi (obrazy, ikony itp.).
 *   `utils/`: Katalog z funkcjami pomocniczymi.
     *   `utils/TogetherAIStream.ts`: Obsługa strumienia Together AI.
     *   `utils/utils.ts`: Plik z funkcjami pomocniczymi.
 *   Pliki konfiguracyjne i inne:
     *   `.eslintrc.json`
     *   `.example.env`
     *   `.gitignore`
     *   `.prettierrc`
     *   `next.config.mjs`
     *   `package-lock.json`
     *   `package.json`: Zawiera informacje o zależnościach i skryptach.
     *   `postcss.config.mjs`
     *   `README.md`: Opis projektu i instrukcje uruchomienia.
     *   `tailwind.config.ts`
     *   `tsconfig.json`

 ## 4. Zależności
 Projekt zależy od wielu bibliotek, w tym:
 *   React i React DOM
 *   Next.js
 *   Tailwind CSS
 *   OpenAI
 *   Together AI
 *   Inne biblioteki wymienione w `package.json`.

 ## 5. Skrypty
 Projekt zawiera następujące skrypty:
 *   `dev`: Uruchamia aplikację w trybie deweloperskim.
 *   `build`: Buduje aplikację.
 *   `start`: Uruchamia zbudowaną aplikację.
 *   `lint`: Uruchamia linter.

 ## 6. Instrukcja uruchomienia
 1.  Sklonuj repozytorium.
 2.  Utwórz konto na [Together AI](https://togetherai.link) dla LLM.
 3.  Utwórz konto na [SERP API](https://serper.dev/) lub z Azure ([Bing Search API](https://www.microsoft.com/en-us/bing/apis/bing-web-search-api)).
 4.  Utwórz konto na [Helicone](https://www.helicone.ai/) dla obserwacji.
 5.  Utwórz plik `.env` (użyj `.example.env` jako odniesienia) i zastąp klucze API.
 6.  Uruchom `npm install` i `npm run dev`.

 ## 7. Przyszłe zadania (z README.md)
 *   [ ] Dodanie przycisków udostępniania i kopiowania po wygenerowaniu konwersacji.
 *   [ ] Dodanie potencjalnych pytań uzupełniających i nowego czatu na końcu strony czatu.
 *   [ ] Podzielenie strony na dwie strony i dodanie stopki.
 *   [ ] Przeniesienie wszystkich ikon do własnego pliku typescript (transform.tools).
 *   [ ] Dodanie bardziej szczegółowej strony docelowej z ładną sekcją z linkiem do GitHub.
 *   [ ] Dodanie ładnego menu hamburgera na urządzeniach mobilnych.
 *   [ ] Wypróbowanie generatywnego interfejsu użytkownika z Vercel.
 *   [ ] Dodanie ładniejszej rozwijanej listy.

 ## 8. Podsumowanie
 Projekt Llama Tutor to aplikacja Next.js wykorzystująca Llama 3 i Together AI. Projekt jest w fazie rozwoju i ma kilka przyszłych zadań do wykonania.