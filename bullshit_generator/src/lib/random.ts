export function randomInt(min:number,max:number){
  return Math.floor(Math.random() * Math.abs(max - min) + Math.min(min,max))
}


export function createRandomPicker(arr:string[]){
  arr = [...arr]
  function randomPickString(){
    const len = arr.length - 1
    const index = randomInt(0,len)
    const picked  = arr[index]  as string
    [arr[index],arr[len]] = [arr[len],arr[index]]
    return picked
  }
  randomPickString()
  return randomPickString
}