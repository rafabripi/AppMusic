import config from "./config";
const {apiKey} = config;
const URLAPI = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`;

export default function getArtists(selectedCountry) {
    const URLCountry = URLAPI.replace(':country', selectedCountry)
    return fetch(URLCountry)
        .then(res => res.json() )
        .then(json => json.topartists.artist)
}