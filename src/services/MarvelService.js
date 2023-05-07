


class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=928a07f8ca1a2fda4e9ad4cb7d443e83';

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error (`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = 210) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]); 
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: (char.description.length<180?char.description:char.description.substring(0, 180) + '...') || 'There is no info about the character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items}
        }

}

export default MarvelService;