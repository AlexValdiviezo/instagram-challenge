export const deletePublics = async(uid) =>{
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uid})
    };
    const result = await fetch(`https://instagram-challenge-backend.herokuapp.com/api/`, requestOptions);
    let results = await result.json();
    return results;
}