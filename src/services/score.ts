const SCORE_STORE_KEY = "STORE";


interface InnerSubject {
    topics: Array<Array<number>>
}
type InnerSubjectScores = Array<Array<number>>


interface Subject {
    name: string
    topics: Array<ScoreItem>
}

interface ScoreItem {
    index: number;
    error: number;
    success: number
}

const getStorageAsync = function <T = string>(key: string) {
    return new Promise<T>((resolve, reject) => {
        uni.getStorage({
            key: key,
            success(result) {
                resolve(result.data)
            },
            fail(reason) {
                resolve([] as any as T)
                //reject(reason)
            }
        })
    })
}
const getScore = function (subject: string) {
    return getStorageAsync(subject).then((res) => {
        const topics = ((res || []) as any as InnerSubjectScores).map((x, y) => {
            return {
                index: y,
                error: x && x[0] || 0,
                success: x && x[1] || 0
            }
        })
        return {
            name: subject,
            topics: topics
        } as Subject
    })
}

const saveScore = function (subject: Subject) {
    const topics = subject.topics.map(x => {
        return [x.error, x.success]
    })
    return new Promise((resolve, reject) => {
        uni.setStorage({
            key: subject.name,
            data: topics,
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            }
        })
    })

}





const fetchSubject = function <T>(url: string) {
    return new Promise<Array<T>>((resolve, reject) => {
        uni.request({
            url: url,
            success: (res: any) => {
                const arr = res.data.questions as Array<T>
                res.data.questions.forEach((x: { id: any; }, i: any) => {
                    x.id = i
                });
                resolve(arr);

            }, fail: (err) => {
                reject(err)
            }
        })
    })
}

interface FetchOption {
    url: string
    name: string
    random?: boolean
    top?: number
}

export const fetchSubjectRandom = async function (option: FetchOption) {
    const qs = await fetchSubject(option.url);
    const scors = await getScore(option.name)

    let remain = qs.length;
    while (remain > 0) {
        const startIdx = qs.length - 1 - remain
        const v = Math.ceil(Math.random() * (remain))
        const idx = startIdx + v
        const s = qs[startIdx]
        qs[startIdx] = qs[idx]
        qs[idx] = s
        remain--
    }
    return qs.filter((x, y) => y < (option.top || 1000));
    // for (let i = 0; i < qs.length; i++) {
    //     //
    //     Math.random() * totalWeight
    //     qs[i]

    // }

    // const weights = qs.map((x, y) => {
    //     const weight = scors.topics[y] ? (10 + scors.topics[y].error * 3 - scors.topics[y].success) : 10
    //     totalWeight += weight;
    //     return weight;
    // })

    // let start = 0;
    // let top = option.top || qs.length
    // if (top > qs.length) top = qs.length
    // const result = []
    // while (top > 0) {
    //     let remain = Math.random() * totalWeight
    //     let pos = qs.length - 1;
    //     for (let i = start; i < qs.length; i++) {
    //         remain -= weights[i]
    //         if (remain <= 0) {
    //             pos = i;
    //             break;
    //         }
    //     }
    //     const sw = weights[start]
    //     weights[start] = weights[pos]
    //     weights[pos] = weights[start]
    //     start++
    //     totalWeight -= weights[start]
    //     result.push(pos)
    //     top--
    // }
    // console.log('生成题目', { weights, result })
    // return result.map(x => qs[x])
}

export const updateSujectScores = function (subject: string, topis: Array<{ index: number, success: boolean }>) {
    return getScore(subject).then(s => {
        topis.forEach(t => {
            const item: ScoreItem = s.topics[t.index] || (s.topics[t.index] = { index: t.index, error: 0, success: 0 })
            if (t.success) item.success++;
            else item.error++
        })
        return saveScore(s)
    })
}




