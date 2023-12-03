const dbUrl = 'http://localhost:3001/parcel';

export const getSentParcels = async (userid: number, token: String) => {
    const response = await fetch(`${dbUrl}/sent/${userid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
export const getReceivedParcels = async (userid: number, token: String) => {
    const response = await fetch(`${dbUrl}/received/${userid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
};




