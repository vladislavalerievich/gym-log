export const timestampToString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString().toLocaleString();
}