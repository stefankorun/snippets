import _ from 'lodash'

let GMapsApi = null;

function citiesSearch(string) {
    return initAutocompleteCached().then(service => {
        return new Promise(res => {
            service.getPlacePredictions({
                input: string,
                types: ['(cities)']
            }, res)
        })
    })
};

const initAutocompleteCached = _.memoize(initAutocomplete);

function initAutocomplete() {
    return initApi().then(GMapsApi => new GMapsApi.places.AutocompleteService())
}

function initApi() {
    const apiKey = 'api-key-placeholder';
    const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    if (GMapsApi) {
        return Promise.resolve(GMapsApi)
    } else {
        return loadScriptCached(apiUrl).then(() => {
            GMapsApi = window.google.maps;
            return GMapsApi;
        });
    }
}

const loadScriptCached = _.memoize(loadScript);

function loadScript(src) {
    return new Promise((res, rej) => {
        let script = document.createElement('script');
        document.body.appendChild(script);
        Object.assign(script, {
            async: true,
            src: src,
            onload: res,
            onerror: rej,
        });
    })
}
