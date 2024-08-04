const ratingCoefficients: [number, number][] = [
    [0, 1.6],
    [50, 8],
    [60, 9.6],
    [70, 11.2],
    [75, 12.0],
    [80, 13.6],
    [90, 15.2],
    [94, 16.8],
    [97, 20],
    [98, 20.3],
    [99, 20.8],
    [99.5, 21.1],
    [100, 21.6],
    [100.5, 22.4],
];

export const calculateRating = (internalLevel: number, accuracy: number): number => {
    var rating = 0;
    for (let i = 0; i < ratingCoefficients.length - 1; i++) {
        const [lowAcc, lowMultiplier] = ratingCoefficients[i];
        const [highAcc] = ratingCoefficients[i + 1];
        
        // ratings are the same for any >=100.5
        if (accuracy >= ratingCoefficients[ratingCoefficients.length - 1][0]) {
            rating = internalLevel * ratingCoefficients[ratingCoefficients.length - 1][0] * ratingCoefficients[ratingCoefficients.length - 1][1] / 100;
            return Math.floor(rating);
        }

        // use coefficient of lower bound if 0 <= acc < 100.5
        if (accuracy >= lowAcc && accuracy < highAcc) {
            rating = internalLevel * accuracy * lowMultiplier / 100
            return Math.floor(rating);
        }
    }

    return 0;
}