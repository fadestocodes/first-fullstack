
function getCountryFlag(countryCode) {
    if (!countryCode || countryCode === 'ZZ') return '🌍';
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
}


export async function GET(req) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query'); // Retrieve the query param

    const googleMapsApiKey = process.env.GOOGLE_MAPS_API;

    if (!googleMapsApiKey) {
        console.error('Google API key is not set!');
        return new Response('API Key not set', { status: 500 });
    }

    try {
        // Step 1: Fetch autocomplete suggestions
        const autocompleteResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(regions)&key=${googleMapsApiKey}`
        );
        const autocompleteData = await autocompleteResponse.json();

        if (autocompleteData.status !== 'OK') {
            return new Response(JSON.stringify({ error: "Couldn't find your location." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Step 2: Fetch detailed data for each suggestion
        const detailedResults = await Promise.all(
            autocompleteData.predictions.map(async (prediction) => {
                const placeDetailsResponse = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${googleMapsApiKey}`
                );
                const placeDetails = await placeDetailsResponse.json();

                if (placeDetails.status !== 'OK') {
                    console.error(`Failed to fetch details for place_id: ${prediction.place_id}`);
                    return null;
                }

                const countryComponent = placeDetails.result.address_components?.find((component) =>
                    component.types.includes('country')
                );

                return {
                    name: prediction.description,
                    country: countryComponent?.long_name,
                    countryCode: countryComponent?.short_name,
                    emoji : getCountryFlag(countryComponent?.short_name)
                };
            })
        );

        // Filter out any failed results
        const filteredResults = detailedResults.filter((result) => result !== null);

        return new Response(JSON.stringify({ predictions: filteredResults }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error fetching places data:', err);
        return new Response('Error fetching places data', { status: 500 });
    }
}
