# VHS Data Search

This is a demo application showing how to enable a fast and comfortable search on the VHS data. 

The data can be found at https://daten.berlin.de/datensaetze/kurse-der-berliner-volkshochschulen. Download the json and move it to `data/courses.json`. 

### Setup

Clone the repository and install the dependencies

```bash
$ git clone git@github.com:rcdexta/react-autocomplete-demo.git
$ cd react-autocomplete-demo
$ yarn
```

Start the server by running `yarn start` command

The UI expects elastic search to be running on 9200 port.

```bash
docker run --name elastic_search -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "http.cors.enabled=true" -e "http.cors.allow-origin=*" docker.elastic.co/elasticsearch/elasticsearch:6.4.0
```

Resetting data: 
```bash
curl -X DELETE 'http://localhost:9200/_all'
```