export async function getObjectPets(src, length) {
    const res = await fetch(src);
    //console.log(res);
    const rawData = await res.json();

    // console.log(rawData);

    let fullPetsList = [];
    let flow = [];
    let n;
        for (let i = 0; i < length; i++) {
            do {
                n = (Math.floor(Math.random() * 8));

                // console.log(n);

            } while (flow.includes(n, Math.floor(i / 8) * 8) ||
            flow.includes(n, Math.floor(i / 6) * 6) ||
            flow.includes(n, Math.floor(i / 3) * 3) );

            flow.push(n);
            fullPetsList.push(rawData[n]);
        }

    // console.log(fullPetsList);

    return fullPetsList;

}

//getObjectPets('assets/js/pets.json', 8);

module.exports.getObjectPets = getObjectPets;

