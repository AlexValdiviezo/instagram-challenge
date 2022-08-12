export const putPublics = async(id) =>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, like:1})
    };
    const result = await fetch('https://instagram-challenge-backend.herokuapp.com/api/', requestOptions);
    return;
}