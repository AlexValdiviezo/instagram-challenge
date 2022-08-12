export const deletePublics = async(uid) =>{
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uid})
    };
    const result = await fetch(`http://localhost:8080/api/`, requestOptions);
    const {data} = await result.json();
    console.log(data);
    return data;
}