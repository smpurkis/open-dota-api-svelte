const openDotaBaseUrl = "https://api.opendota.com/api/";


async function loadUrl(url) {
    let local = localStorage.getItem(url)
    if (local == null) {
        let json = await (await fetch(url)).json();
        localStorage.setItem(url, JSON.stringify(json))
        return json;
    } else {
        return JSON.parse(local)
    }
}

let heroes = loadUrl(openDotaBaseUrl + "heroes");
let heroesStats = loadUrl(openDotaBaseUrl + "heroStats")

async function retrieveHeroData() {
    let allHeroDetails = Object.values(await loadUrl("data/heroDetails.json"));
    heroes = await heroes;
    heroesStats = await heroesStats
    for (let i = 0; i < heroes.length; i++) {
        const hero = heroes[i]
        const heroStats = heroesStats[i]
        let heroDetails = allHeroDetails.filter(heroDets => heroDets.name == hero.localized_name)[0]
        Object.assign(heroDetails, hero)
        Object.assign(heroDetails, heroStats)
        heroDetails.name = hero.localized_name
    }
    return allHeroDetails;
}

async function loadPortraitSrc(heroName, heroDetails) {
    let portraitSrc = heroDetails.src;
    return portraitSrc;
}

export { loadUrl, retrieveHeroData, openDotaBaseUrl, loadPortraitSrc };
