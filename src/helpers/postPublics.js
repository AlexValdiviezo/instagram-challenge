export const postPublics = async(url, txt) =>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagen: url, titulo:txt, likes:0})
    };
    const result = await fetch(`https://instagram-challenge-backend.herokuapp.com/api/`, requestOptions);
    let results = await result.json();
    return results;
}