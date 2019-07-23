# Absenzenmanagement

[![Build Status](https://travis-ci.org/erz-mba-fbi/absenzenmanagement.svg?branch=master)](https://travis-ci.org/erz-mba-fbi/absenzenmanagement)

JavaScript web module to implement the process "Absenzenverwaltung" using the CLX.Evento backend (REST API).

[Demo](https://erz-mba-fbi.github.io/absenzenmanagement/app)

## Integration

Download the [latest build](absenzenmanagement.zip).

To integrate this application in your website, you have to copy and paste the import of the `settings.js` and the CSS file from `index.html`'s `<head>`:

```
<head>
  <script src="settings.js"></script>
  <link rel="stylesheet" href="styles.xyz.css"></head>
</head>
```

In addition, you have to copy and paste the app tag and all `<script>` tags from `index.html`'s `<body>`:

```
<body>
  <erz-app></erz-app>
  <script type="text/javascript" src="runtime.xyz.js"></script>
  ...
  <script type="text/javascript" src="main.xyz.js"></script>
</body>
```

To configure the app, you have to rename the file `settings.example.js` to `settings.js` and adjust its contents.

### Authorization

The website integrating this application has to make sure the OAuth access token is available in localStorage under the key `CLX.LoginToken` (e.g. by setting `localStorage.setItem('CLX.LoginToken', '...')`). If not provided, the application displays a unauthenticated message to the user.

## Development

- Common aspects are documented in the [Wiki](https://github.com/erz-mba-fbi/absenzenmanagement/wiki)
- [Setup development environment](doc/setup-dev-environment.md)
- [Prettier](doc/prettier.md)
- [Internationalization (i18n)](doc/i18n.md)
