export const asyncFetch= async(url, requestOptions)=>{
    const response = await(await (fetch(url,requestOptions))).json();
    return response;
}