export function randomInt(min, max) {
    return Math.random() * Math.abs(max - min) + Math.min(min, max);
}
export function createRandomPicker(arr) {
    arr = [...arr];
    function randomPickString() {
        const len = arr.length - 1;
        const index = randomInt(0, len);
        const picked = arr[index][arr[index], arr[len]] = [arr[len], arr[index]];
        return picked;
    }
    randomPickString();
    return randomPickString;
}
