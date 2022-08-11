export const getPublics = async() =>{
    const result = await fetch(`https://instagram-challenge-backend.herokuapp.com/api/`);
    let results = await result.json();
    return results;
}