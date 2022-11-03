import { createRandomPicker, randomInt } from "./random.js";

import { corpus } from "../read-sources.js";

type CorpusType = typeof corpus;

type CorpusKeys = {
  [key in keyof CorpusType]: string[]
};

function sentence(pick: () => string, replacer: Record<any, (() => string) | string>) {
  let res = pick();
  for (let key in replacer) {
    let replaceValue = replacer[key]
    res = res.replace(new RegExp(`{{${key}}}`, "g"), typeof replaceValue === 'function' ? replaceValue() : replaceValue);
  }
  return res;
}

export function generator(
  title: string,
  {
    corpus = {},
    min = 6000,
    max = 10000,
  }: {
    corpus?: CorpusKeys;
    min?: number;
    max?: number;
  } = {}
) {
  try {
    const articleLength = randomInt(min, max);
    const {
      famous = [],
      bosh_before = [],
      bosh = [],
      said = [],
      conclude = [],
    } = corpus;
    const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude, pickTitle] = [
      famous,
      bosh_before,
      bosh,
      said,
      conclude,
    ].map((item) => {
      return createRandomPicker(item);
    });
    const article : string[] = []
    let totalLength = 0

    while(totalLength < articleLength){
      let section = ''
      const sectionLength = randomInt(200,500)

      while(section?.length < sectionLength || !/[。？\.\?]$/.test(section)){
        const n = randomInt(0,100)
        if(n < 20){
          section += sentence(pickFamous,{said : pickSaid,conclude : pickConclude})
        } else if(n < 50){
          section += sentence(pickBoshBefore,{title}) +  sentence(pickBosh,{title})
        } else {
          section += sentence(pickBosh,{title})
        }
      }
      totalLength += section?.length || 0
      article.push(section)
    }
    return article
  } catch (e) {
    console.log("generator error is", e);
    return []
  }
}
