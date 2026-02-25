sequenceDiagram
    participant browser
    participant server

    Note right of browser: All requests return same responses as regular site with the difference being the executed JS code (spa.js) updating the DOM

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 200 OK (HTML document)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 200 OK (CSS file)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: 200 OK (JS file)
    deactivate server

    Note right of browser: JavaScript code is executed to fetch the JSON array of notes from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 200 OK (JSON array of notes)
    deactivate server

    Note right of browser: spa.js updates the DOM to render the notes (without reloading page)

    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server-->>browser: 404 Not Found (HTML body with Not Found message)
    deactivate server
