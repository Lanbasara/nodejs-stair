import {readFileSync} from 'fs'
import { fileURLToPath } from 'url'
import { dirname,resolve } from 'path'
import { createRandomPicker } from './lib/random.js'
const url = import.meta.url
const path = resolve(dirname(fileURLToPath(url)),'../corpus/data.json')
const data = readFileSync(path,{encoding : "utf-8"})
// console.log('typeof data is',typeof data)
const corpus = JSON.parse(data)
const pickFamous = createRandomPicker(corpus?.famous)
const pickSaid = createRandomPicker(corpus?.said)
const pickConclude = createRandomPicker(corpus?.conclude)

function sentense(pick:() => string,replacer : Record<any,() => string>){
  let res = pick()
  for(let key in replacer){
    res = res.replace(new RegExp(`{{${key}}}`,'g'),replacer[key]())
  }
  return res
}
console.log(sentense(pickFamous,{said : pickSaid,conclude:pickConclude}))
