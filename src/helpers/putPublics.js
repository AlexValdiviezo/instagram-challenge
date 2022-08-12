export const putPublics = async(id) =>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, like:1})
    };
    const {data} = await fetch('http://localhost:8080/api/', requestOptions);
    return data;
}