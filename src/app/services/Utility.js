export const copyObj = (val) => {
    if (val) {
        return JSON.parse(JSON.stringify(val));
    }
    return val;
}

export const getCurrentTimestamp = () => {
    let time = new Date();
    return new Date(time.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
}
