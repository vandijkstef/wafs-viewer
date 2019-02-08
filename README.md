# WAFS Viewer
This small project aims to visualize some student results.

## Getting started
Data from Drive is not available in JSON, so I've opted for CSV.

First, download the overview as CSV file and place it in the data folder
Change the name so it corresponds with `infile` in `nodetools/csvtojson.js`.

Then
```
npm install
npm run parse-csv
```

All thats left is serving the `public` folder through a webserver. (JSON is fetched)
