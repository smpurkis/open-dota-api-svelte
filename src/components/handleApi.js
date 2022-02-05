const openDotaBaseUrl = "https://api.opendota.com/api/";


async function loadJsonFromURL(url) {
    /**
     * Load json data from specified URL
     */
    let local = localStorage.getItem(url)
    if (local == null) {
        let json = await (await fetch(url)).json();
        localStorage.setItem(url, JSON.stringify(json))
        return json;
    } else {
        return JSON.parse(local)
    }
}

let heroes = loadJsonFromURL(openDotaBaseUrl + "heroes");
let heroesStats = loadJsonFromURL(openDotaBaseUrl + "heroStats")

async function retrieveHeroData() {
    /**
     * Collect hero data into a single array
     */
    let allHeroDetails = Object.values(await loadJsonFromURL("data/heroDetails.json"));
    heroes = await heroes;
    heroesStats = await heroesStats
    for (let i = 0; i < heroes.length; i++) {
        const hero = heroes[i]
        const heroStats = heroesStats[i]
        let heroDetails = allHeroDetails.filter(heroDets => heroDets.name == hero.localized_name)[0]
        if (heroDetails != null) {
            Object.assign(heroDetails, hero)
            Object.assign(heroDetails, heroStats)
            heroDetails.name = hero.localized_name
        } else {
            console.log("Unable to retrieve hero details for", hero.localized_name, hero)
        }
    }
    return allHeroDetails;
}

async function loadPortraitSrc(heroName, heroDetails) {
    /**
     * Extract hero portrait URL
     */
    let portraitSrc = heroDetails.src;
    return portraitSrc;
}

export { loadJsonFromURL as loadUrl, retrieveHeroData, openDotaBaseUrl, loadPortraitSrc };
