sequenceDiagram
    participant browser
    participant server

    Note right of browser: Up to this point is the first load of the SPA

    Note right of browser: New note is input and 'Save' button pressed

    Note right of browser: DOM is updated and redrawn before POST request to server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (JSON {content: <text>, date: <date>})
    activate server
    server-->>browser: 201
    deactivate server
