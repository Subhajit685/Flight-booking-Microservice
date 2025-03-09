export const timeCalculate = (dep, ari) => {
    const departureTime = new Date(dep);
    const arrivalTime = new Date(ari);

    return arrivalTime > departureTime
}